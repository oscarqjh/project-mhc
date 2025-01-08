import { app, BaseWindow, ipcMain, WebContentsView } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import {
  getStaticData,
  pollResources,
  printStaticData,
} from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
import { configureTray } from "./tray.js";
import { configureMenu } from "./menu.js";
import { monitorNavigation } from "./eventMonitor.js";

const DEV_TOOL_MODE = 1; // 0: Left view, 1: Right view, 2: Both views

// Util function to wait for the server to start
const waitForServer = (url) =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      fetch(url)
        .then(() => {
          clearInterval(interval);
          resolve();
        })
        .catch(() => {
          console.log(`Waiting for server at ${url}...`);
        });
    }, 500);
  });

function createWindow() {
  // Create a new window
  const win = new BaseWindow({
    width: 1600,
    height: 900,
    backgroundColor: "#2e2c29",
  });

  // left view for mousehunt.com
  const gameView = new WebContentsView({
    webPreferences: {
      preload: getPreloadPath(), // Preload script
      contextIsolation: true, // Important for security
      nodeIntegration: false, // Do not enable nodeIntegration for security reasons
    },
  });
  win.contentView.addChildView(gameView);
  gameView.webContents.loadURL("https://mousehuntgame.com");
  gameView.setBounds({ x: 0, y: 0, width: 800, height: 900 });

  // right view for app GUI
  const clientView = new WebContentsView({
    webPreferences: {
      preload: getPreloadPath(), // Preload script
      contextIsolation: true, // Important for security
      nodeIntegration: false, // Do not enable nodeIntegration for security reasons
    },
  });
  win.contentView.addChildView(clientView);
  if (isDev()) {
    // load app from localhost if in development mode
    clientView.webContents.loadURL("http://localhost:5174");
  } else {
    // load app from build folder if in production mode
    clientView.webContents.loadFile(
      path.join(app.getAppPath(), "/dist-react/index.html")
    );
  }
  clientView.setBounds({ x: 800, y: 0, width: 800, height: 900 });

  // Open the DevTools
  if (isDev()) {
    if (DEV_TOOL_MODE === 0) {
      gameView.webContents.openDevTools({
        mode: "detach",
      });
    } else if (DEV_TOOL_MODE === 1) {
      clientView.webContents.openDevTools({
        mode: "detach",
      });
    } else {
      gameView.webContents.openDevTools({
        mode: "detach",
      });
      clientView.webContents.openDevTools({
        mode: "detach",
      });
    }
  }

  // Emitted when the window is closed
  win.on("closed", () => {
    gameView.webContents.close();
    clientView.webContents.close();
  });

  return {
    win,
    gameView,
    clientView,
  };
}

app.on("ready", async () => {
  const windows = createWindow(); // Create the window
  configureTray(windows.win); // Create the tray icon
  // configureMenu(); // Create the menu
  ipcMain.handle("getStaticData", () => getStaticData()); // Handle getStaticData
  printStaticData(); // Print static data
  // pollResources(); // Start polling resources
  monitorNavigation(windows.gameView, windows.clientView); // Monitor navigation
});
