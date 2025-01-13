import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/src/electron/preload.cjs"
  );
}

export function getUiPath() {
  return path.join(app.getAppPath(), "/dist-react/index.html");
}

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}

export function getDbPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/src/electron/database"
  );
}
