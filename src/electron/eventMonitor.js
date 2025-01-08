import { shell } from "electron";

export function monitorNavigation(gameView, clientView, mainWindow) {
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
      trackNewWindowEvents();
    }
  }

  // Function to track new window events
  function trackNewWindowEvents() {
    gameView.webContents.setWindowOpenHandler((details) => {
      console.log("New window requested:", details.url);
      shell.openExternal(details.url);

      // redirect to: https://mhwiki.hitgrab.com/wiki/
      if (details.url.includes("mhwiki.hitgrab.com/wiki/")) {
        const redirectUrl = new URL(details.url); // make url object
        const title = redirectUrl.searchParams.get("title"); // get title parameter
        // tab: FAQ
        if (title === "FAQ") {
          const payload = {
            type: "redirect",
            location: "wiki",
            tab: "FAQ",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: default -> wiki
        else {
          const payload = {
            type: "redirect",
            location: "wiki",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      // redirect to: https://adefinitivemhguide.wordpress.com/
      if (details.url.includes("adefinitivemhguide.wordpress.com/")) {
        const payload = {
          type: "redirect",
          location: "wordpress",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // redirect to: https://gaming.youtube.com/c/MouseHuntTheGame/live
      if (details.url.includes("gaming.youtube.com/c/MouseHuntTheGame/live")) {
        const payload = {
          type: "redirect",
          location: "youtube",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // redirect to: https://society6.com/hitgrab
      if (details.url.includes("society6.com/hitgrab")) {
        const payload = {
          type: "redirect",
          location: "merchandise",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // redirect to: https://www.facebook.com/pages/MouseHunt/
      if (details.url.includes("facebook.com/pages/MouseHunt/")) {
        const payload = {
          type: "redirect",
          location: "facebook",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      return { action: "deny" };
    });
  }

  // Function to set up event listeners
  function startMonitoring() {
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
        //tab: cheese
        if (tab === "cheese") {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "cheese",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: traps
        else if (tab === "traps") {
          // subtab: base
          if (subtab === "base") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "traps",
              subtab: "base",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: weapon
          else if (subtab === "weapon") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "traps",
              subtab: "weapon",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: trinket
          else if (subtab === "trinket") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "traps",
              subtab: "trinket",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: skin
          else if (subtab === "skin") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "traps",
              subtab: "skin",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> base
          else {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "traps",
              subtab: "base",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: crafting
        else if (tab === "crafting") {
          // subtab: recipe
          if (subtab === "recipe") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "crafting",
              subtab: "recipe",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: crafting_table
          else if (subtab === "crafting_table") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "crafting",
              subtab: "crafting_table",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: hammer
          else if (subtab === "hammer") {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "crafting",
              subtab: "hammer",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> recipe
          else {
            const payload = {
              type: "nav",
              location: "inventory",
              tab: "crafting",
              subtab: "recipe",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: potions
        else if (tab === "potions") {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "potions",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: special
        else if (tab === "special") {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "special",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: collectibles
        else if (tab === "collectibles") {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "collectibles",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: plankrun
        else if (tab === "plankrun") {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "plankrun",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: default -> cheese
        else {
          const payload = {
            type: "nav",
            location: "inventory",
            tab: "cheese",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      //nav to: shops
      if (url.includes("shops.php")) {
        // tab: cheese_shoppe
        if (tab === "cheese_shoppe") {
          const payload = {
            type: "nav",
            location: "shops",
            tab: "cheese_shoppe",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: trapsmith
        else if (tab === "trapsmith") {
          // subtab: all
          if (subtab === "all") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "trapsmith",
              subtab: "all",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: base
          else if (subtab === "base") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "trapsmith",
              subtab: "base",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: weapon
          else if (subtab === "weapon") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "trapsmith",
              subtab: "weapon",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: skin
          else if (subtab === "skin") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "trapsmith",
              subtab: "skin",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> all
          else {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "trapsmith",
              subtab: "all",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: charm_shoppe
        else if (tab === "charm_shoppe") {
          const payload = {
            type: "nav",
            location: "shops",
            tab: "charm_shoppe",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: general_store
        else if (tab === "general_store") {
          const payload = {
            type: "nav",
            location: "shops",
            tab: "general_store",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: cartographer
        else if (tab === "cartographer") {
          const payload = {
            type: "nav",
            location: "shops",
            tab: "cartographer",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: kings_cart
        else if (tab === "kings_cart") {
          // subtab: all
          if (subtab === "all") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "all",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: kings_trapsmith
          else if (subtab === "kings_trapsmith") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "kings_trapsmith",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: kings_charm_shop
          else if (subtab === "kings_charm_shop") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "kings_charm_shop",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: kings_general_store
          else if (subtab === "kings_general_store") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "kings_general_store",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: kings_cartographer
          else if (subtab === "kings_cartographer") {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "kings_cartographer",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> all
          else {
            const payload = {
              type: "nav",
              location: "shops",
              tab: "kings_cart",
              subtab: "all",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: default -> cheese_shoppe
        else {
          const payload = {
            type: "nav",
            location: "shops",
            tab: "cheese_shoppe",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      //nav to: mice
      if (url.includes("adversaries.php")) {
        // tab: groups
        if (tab === "groups") {
          const payload = {
            type: "nav",
            location: "adversaries",
            tab: "groups",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: regions
        else if (tab === "regions") {
          const payload = {
            type: "nav",
            location: "adversaries",
            tab: "regions",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: your_stats
        else if (tab === "your_stats") {
          // subtab: group
          if (subtab === "group") {
            const payload = {
              type: "nav",
              location: "adversaries",
              tab: "your_stats",
              subtab: "group",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: location
          else if (subtab === "location") {
            const payload = {
              type: "nav",
              location: "adversaries",
              tab: "your_stats",
              subtab: "location",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> group
          else {
            const payload = {
              type: "nav",
              location: "adversaries",
              tab: "your_stats",
              subtab: "group",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: default -> groups
        else {
          const payload = {
            type: "nav",
            location: "adversaries",
            tab: "groups",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      //nav to: friends
      if (url.includes("friends.php")) {
        // tab: friends
        if (tab === "friends") {
          const payload = {
            type: "nav",
            location: "friends",
            tab: "friends",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: requests
        else if (tab === "requests") {
          // subtab: manage_requests
          if (subtab === "manage_requests") {
            const payload = {
              type: "nav",
              location: "friends",
              tab: "requests",
              subtab: "manage_requests",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: community
          else if (subtab === "community") {
            const payload = {
              type: "nav",
              location: "friends",
              tab: "requests",
              subtab: "community",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: import_facebook
          else if (subtab === "import_facebook") {
            const payload = {
              type: "nav",
              location: "friends",
              tab: "requests",
              subtab: "import_facebook",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
          // subtab: default -> manage_requests
          else {
            const payload = {
              type: "nav",
              location: "friends",
              tab: "requests",
              subtab: "manage_requests",
              timestamp: new Date().toLocaleTimeString(),
            };
            clientView.webContents.send("logEvent", payload);
          }
        }
        // tab: default -> friends
        else {
          const payload = {
            type: "nav",
            location: "friends",
            tab: "friends",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      // nav to: team
      if (url.includes("team.php")) {
        const payload = {
          type: "nav",
          location: "team",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // nav to: tournament
      if (url.includes("tournament.php")) {
        const payload = {
          type: "nav",
          location: "tournament",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // nav to: scoreboards
      if (url.includes("scoreboards.php")) {
        // tab: main
        if (tab === "main") {
          const payload = {
            type: "nav",
            location: "scoreboards",
            tab: "main",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: tournament
        else if (tab === "tournament") {
          const payload = {
            type: "nav",
            location: "scoreboards",
            tab: "tournament",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: event
        else if (tab === "event") {
          const payload = {
            type: "nav",
            location: "scoreboards",
            tab: "event",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: default -> main
        else {
          const payload = {
            type: "nav",
            location: "scoreboards",
            tab: "main",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }

      // nav to: forum
      if (url.includes("forum.php")) {
        const payload = {
          type: "nav",
          location: "forum",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // nav to: news
      if (url.includes("news.php") || url.includes("newspost.php")) {
        const news_id = urlObj.searchParams.get("news_post_id"); // get news_id parameter
        const payload = {
          type: "nav",
          location: "news",
          tab: news_id ? `post-${news_id}` : null,
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // nav to: discord
      if (url.includes("discord.php")) {
        const payload = {
          type: "nav",
          location: "discord",
          timestamp: new Date().toLocaleTimeString(),
        };
        clientView.webContents.send("logEvent", payload);
      }

      // nav to: preferences
      if (url.includes("preferences.php")) {
        // tab: personal_info
        if (tab === "personal_info") {
          const payload = {
            type: "nav",
            location: "preferences",
            tab: "personal_info",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: game_settings
        else if (tab === "game_settings") {
          const payload = {
            type: "nav",
            location: "preferences",
            tab: "game_settings",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: account_settings
        else if (tab === "account_settings") {
          const payload = {
            type: "nav",
            location: "preferences",
            tab: "account_settings",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
        // tab: default -> personal_info
        else {
          const payload = {
            type: "nav",
            location: "preferences",
            tab: "personal_info",
            timestamp: new Date().toLocaleTimeString(),
          };
          clientView.webContents.send("logEvent", payload);
        }
      }
    });
  }
}
