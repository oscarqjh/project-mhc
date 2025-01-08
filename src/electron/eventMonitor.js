export function monitorNavigation(gameView, clientView) {
  let gameViewReady = false;
  let clientViewReady = false;

  // Wait for gameView to load
  gameView.webContents.once("did-finish-load", () => {
    gameViewReady = true;
    checkAndStartMonitoring();
  });

  // Wait for clientView to load
  clientView.webContents.once("did-finish-load", () => {
    clientViewReady = true;
    checkAndStartMonitoring();
  });

  // Function to start monitoring if both views are ready
  function checkAndStartMonitoring() {
    if (gameViewReady && clientViewReady) {
      startMonitoring();
    }
  }

  // Function to set up event listeners
  function startMonitoring() {
    gameView.webContents.on("did-navigate", (event, url) => {
      console.log(`Navigated to ${url}`);
    });

    gameView.webContents.on("did-navigate-in-page", (event, url) => {
      console.log(`Navigated in page to ${url}`);
      const urlObj = new URL(url); // make url object
      const tab = urlObj.searchParams.get("tab"); // get tab parameter
      const subtab = urlObj.searchParams.get("sub_tab"); // get subtab parameter

      // nav to: camp
      if (url.includes("camp.php")) {
        const payload = {
          type: "nav",
          location: "camp",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      //nav to: profile
      if (urlObj.pathname.includes("profile.php")) {
        //tab: profile
        if (tab === "profile") {
          const payload = {
            type: "nav",
            location: "profile",
            tab: "profile",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        //tab: mice
        else if (tab === "mice") {
          //subtab: group
          if (subtab === "group") {
            const payload = {
              type: "nav",
              location: "profile",
              tab: "mice",
              subtab: "group",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          //subtab: location
          else if (subtab === "location") {
            const payload = {
              type: "nav",
              location: "profile",
              tab: "mice",
              subtab: "location",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          //subtab: default -> group
          else {
            const payload = {
              type: "nav",
              location: "profile",
              tab: "mice",
              subtab: "group",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        //tab: kings_crowns
        else if (tab === "kings_crowns") {
          const payload = {
            type: "nav",
            location: "profile",
            tab: "kings_crowns",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        //tab: items
        else if (tab === "items") {
          const payload = {
            type: "nav",
            location: "profile",
            tab: "items",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: default -> profile
        else {
          const payload = {
            type: "nav",
            location: "profile",
            tab: "profile",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      //nav to: travel
      if (url.includes("travel.php")) {
        //tab: map
        if (tab === "map") {
          const payload = {
            type: "nav",
            location: "travel",
            tab: "map",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        //tab: map_items
        else if (tab === "map_items") {
          const payload = {
            type: "nav",
            location: "travel",
            tab: "map_items",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        //tab: default -> map
        else {
          const payload = {
            type: "nav",
            location: "travel",
            tab: "map",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      //nav to: inventory
      if (url.includes("inventory.php")) {
        const payload = {
          type: "nav",
          location: "inventory",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      //nav to: shops
      if (url.includes("shops.php")) {
        const payload = {
          type: "nav",
          location: "shops",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      //nav to: mice
      if (url.includes("adversaries.php")) {
        const payload = {
          type: "nav",
          location: "mice",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      //nav to: friends
      if (url.includes("friends.php")) {
        const payload = {
          type: "nav",
          location: "friends",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }
    });
  }
}
