const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping')
    },
    on(channel, func) {
      const validChannels = ['ipc-example']
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example']
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args))
      }
    },
  },
  ipc: {
    invoke(channel, arg) {
      return ipcRenderer.invoke(channel, arg)
    },
  },
})
