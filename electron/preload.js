'use strict'

const { contextBridge, ipcRenderer } = require('electron');

// In this file we want to expose protected methods that allow the renderer
// process to use the ipcRenderer without exposing the entire object.

// !!! REMEMBER !!!
// ALL THE CONTEXT BRIDGE CONSTRUCTIONS NEED TO BE DEFINED IN: '/src/main.ts'
contextBridge.exposeInMainWorld("axios", {
    get: (url) => ipcRenderer.invoke('axios:get', url),
    getChallenges: (gameMode) => ipcRenderer.invoke('axios:getChallenges', gameMode),
    getCommands: (gameMode) => ipcRenderer.invoke('axios:getCommands', gameMode),
    getRuleSet: (gameMode) => ipcRenderer.invoke('axios:getRuleSet', gameMode),
    getCivModifier: (gameMode) => ipcRenderer.invoke('axios:getCivModifier', gameMode),
    getMapModifier: (gameMode) => ipcRenderer.invoke('axios:getMapModifier', gameMode),
    getMaps: (gameMode) => ipcRenderer.invoke('axios:getMaps', gameMode),
})
