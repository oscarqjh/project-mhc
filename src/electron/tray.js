import { Menu, Tray } from "electron";
import { getAssetPath } from "./pathResolver.js";
import path from "path";
import { app } from "electron";
import { isDarwin } from "./utils.js";

// Configure the tray icon
export function configureTray(mainWindow) {
  // Create a tray icon
  const tray = new Tray(
    path.join(
      getAssetPath(),
      isDarwin() ? "trayTemplate.png" : "trayIcon@2x.png"
    )
  );

  // Create a context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        mainWindow.show();
        if (app.dock) app.dock.show(); // for macOS
      },
    },
    {
      label: "Exit",
      click: () => app.quit(),
    },
  ]);
  tray.setToolTip("Electron App");
  tray.setContextMenu(contextMenu);

  // handle click event on the tray icon
  handleCloseEvents(mainWindow);
}

function handleCloseEvents(mainWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) return; // Return if the app is quitting
    e.preventDefault(); // Prevent the window from closing
    mainWindow.hide(); // Hide the window when close button is clicked
    if (app.dock) app.dock.hide(); // for macOS
  });

  // set willClose to true when the app is quitting
  app.on("before-quit", () => {
    willClose = true;
  });

  // reset willClose when the window is shown
  mainWindow.on("show", () => {
    willClose = false;
  });
}
