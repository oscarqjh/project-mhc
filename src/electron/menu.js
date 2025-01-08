import { Menu } from "electron";

export function configureMenu(windows) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "App",
        type: "submenu",
        submenu: [
          {
            label: "About",
            role: "about",
          },
          {
            type: "separator",
          },
          {
            label: "Quit",
            role: "quit",
            click: () => app.quit(),
          },
        ],
      },
    ])
  );
}
