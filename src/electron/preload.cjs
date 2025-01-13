const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStats: (callback) => callback({}),
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  send: (channel, data) => {
    // Whitelist of channels for sending data from renderer to main process
    const validChannels = ["logEvent", "AjaxRequest"];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    // Whitelist of channels for receiving data from main to renderer process
    const validChannels = ["logEvent"];
    if (validChannels.includes(channel)) {
      // Remove all listeners from the channel before adding a new one
      // This prevents multiple listeners from being registered
      electron.ipcRenderer.removeAllListeners(channel);
      electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  sendMsg: () => electron.ipcRenderer.send("msg", "Hello from the renderer"),
});
