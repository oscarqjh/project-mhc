import { ipcMain } from "electron";
import { getUiPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

// Check if the app is running in development mode
export function isDev() {
  return process.env.NODE_ENV === "development";
}

// Handle IPC events from the renderer process to the main process
export function ipcMainHandle(key, handler) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

// Validate the event frame
export function validateEventFrame(frame) {
  if (isDev() && new URL(frame.url).host === "localhost:5173") {
    return;
  }
  if (frame.url !== pathToFileURL(getUiPath()).toString()) {
    throw new Error("Malicious event frame detected");
  }
}

// Check if the app is running on Windows
export function isDarwin() {
  return process.platform === "darwin";
}

const jsCode = `
    // Preserve the original XMLHttpRequest open method
    const originalXhrOpen = XMLHttpRequest.prototype.open;

    // Override the open method to intercept requests
    XMLHttpRequest.prototype.open = function (...args) {
      this.addEventListener("load", () => {
        const responseText = this.responseText;
        //console.log("XHR Response:", responseText); // Add contextual message
        window.electron.send("AjaxRequest", responseText);
      });

      // Call the original open method with the original arguments
      return originalXhrOpen.apply(this, args);
    };
  `;

export function injectScript(gameView) {
  gameView.webContents
    .executeJavaScript(jsCode)
    .then(() => {
      console.log("XHR monitoring enabled");
    })
    .catch((err) => {
      console.error("Failed to inject script: ", err);
    });
}
