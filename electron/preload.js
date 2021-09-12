'use strict'

const { contextBridge, ipcRenderer } = require('electron');

// In this file we want to expose protected methods that allow the renderer
// process to use the ipcRenderer without exposing the entire object.

// !!! REMEMBER !!!
// ALL THE CONTEXT BRIDGE CONSTRUCTIONS NEED TO BE DEFINED IN: '/src/main.ts'
contextBridge.exposeInMainWorld("axios", {
    get: (url) => ipcRenderer.invoke('axios:get', url),
});

// ALL THE CONTEXT BRIDGE CONSTRUCTIONS NEED TO BE DEFINED IN: '/src/main.ts'
contextBridge.exposeInMainWorld("fs", {
    getProfile: (name) => ipcRenderer.invoke('fs:getProfile', name),
    getProfileNames: (name) => ipcRenderer.invoke('fs:getProfileNames', name)
});
