import { ipcMain } from "electron";
import { JSDOM } from "jsdom";
import * as htmlparser2 from "htmlparser2";

export function monitorNetwork(gameView, clientView) {
  let gameViewReady = false;
  let clientViewReady = false;
  let initialised = false;
  let eventData = {
    debuggerData: null,
    xhrData: null,
  };

  // Wait for gameView to be ready
  gameView.webContents.on("did-finish-load", () => {
    gameViewReady = true;
    if (clientViewReady && !initialised) {
      checkAndStartMonitoring();
    }
  });

  // Wait for clientView to be ready
  clientView.webContents.on("did-finish-load", () => {
    clientViewReady = true;
    if (gameViewReady && !initialised) {
      checkAndStartMonitoring();
    }
  });

  // Function to start network monitoring
  function checkAndStartMonitoring() {
    if (gameViewReady && clientViewReady) {
      initialised = true;
      startDebugger();
      startXhrMonitoring();
    }
  }

  // Set up network monitoring with debugger
  function startDebugger() {
    console.log("Starting network monitoring with debugger...");

    gameView.webContents.debugger.attach("1.3"); // Attach to the gameView
    gameView.webContents.debugger.sendCommand("Network.enable"); // Enable network monitoring

    // Listen for network events
    gameView.webContents.debugger.on("message", (event, method, params) => {
      if (params.type !== "XHR") {
        return;
      }

      // Log
      if (method === "Network.requestWillBeSent") {
        const data = {
          url: params.request.url,
          method: params.request.method,
          requestid: params.requestId,
          postData: Object.fromEntries(
            new URLSearchParams(params.request.postData)
          ),
        };
        console.log("Request will be sent: ", data);
        eventData.debuggerData = data;
      }
    });

    // Process request data if both debugger and XHR data are available
    processRequestData();
  }

  // Function to start XHR monitoring
  function startXhrMonitoring(debug = false) {
    console.log("Starting XHR monitoring...");

    // Listen for XHR requests from the gameView
    ipcMain.on("AjaxRequest", (event, responseText) => {
      const response = JSON.parse(responseText);
      // console.log("XHR Response: ", response);

      // parse HTML string if journal field is present
      if (response.page?.journal) {
        try {
          const journalString = response.page.journal.entries_string;
          const dom = htmlparser2.parseDocument(journalString);
          if (debug) {
            console.log("Parsed HTML: ", dom);
            console.log("Parsed HTML: ", dom.children[0].attribs);
            console.log("Parsed HTML: ", dom.children[0].children[1].attribs);
            console.log(
              "JournalDate: ",
              dom.children[0].children[1].children[0].children[0].children[0]
                .data
            );
            console.log(
              "JournalEnv: ",
              dom.children[0].children[1].children[0].children[1].children[0]
                .data
            );
            console.log(
              "Mouse weight: ",
              dom.children[0].children[1].children[1].children[2].data
            );
            // active, passive, linked will have diff position
            console.log(
              "Points and Gold: ",
              dom.children[0].children[1].children[1].children[4].data
            );
            const journalText =
              dom.children[0].children[1].children[1].children;
            const loots = [];
            journalText.forEach((journalChild) => {
              if (journalChild.attribs?.class === "loot") {
                const loot_name = journalChild.children[0].data;
                const loot_quantity = journalChild.prev.data;
                loots.push({ loot_name, loot_quantity });
              }
            });
            console.log("Loots: ", loots);
          }
          const journalText = dom.children[0].children[1].children[1].children;
          const loots = [];
          journalText.forEach((journalChild) => {
            if (journalChild.attribs?.class === "loot") {
              const loot_name = journalChild.children[0].data;
              const loot_quantity = journalChild.prev.data;
              loots.push({ loot_name, loot_quantity });
            }
          });
          const data = {
            journal_date:
              dom.children[0].children[1].children[0].children[0].children[0]
                .data,
            journal_env:
              dom.children[0].children[1].children[0].children[1].children[0]
                .data,
            mouse_weight:
              dom.children[0].children[1].children[1].children[2].data,
            points_gold:
              dom.children[0].children[1].children[1].children[4].data,
            loots: loots,
          };
          eventData.xhrData = data; // Set the XHR data

          // Process the data if both debugger and XHR data are available
          processRequestData();
        } catch (error) {
          console.error("Error parsing HTML: ", error);
        }
      }
    });
  }

  // Process request data if both debugger and XHR data are available
  function processRequestData() {
    if (eventData.debuggerData && eventData.xhrData) {
      console.log("Processing request data...");
      console.log("Debugger data: ", eventData.debuggerData);
      console.log("XHR data: ", eventData.xhrData);

      // Reset the data
      eventData.debuggerData = null;
      eventData.xhrData = null;
    }
  }
}
