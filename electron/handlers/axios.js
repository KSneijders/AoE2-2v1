const {ipcMain} = require('electron')
const axios = require("axios");

const gameModeUrl = "https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/game-modes/__GAME_MODE__/__FILE__.json";
const modifierUrl = "https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/game-modes/__GAME_MODE__/challenge-modifiers/__MODIFIER__.json";

async function axiosGet(url) {
    return new Promise(async function (resolve, reject) {
        try {
            const response = await axios.get(url)
            resolve(response.data)
        } catch (e) {
            reject({'response': e})
        }
    });
}

ipcMain.handle('axios:get', async (_, url) => {
    return axiosGet(url).then(data => {
        return data
    }).catch(e => {
        console.warn(`Error retrieving '${url}'`)
        return e
    })
})

ipcMain.handle('axios:getChallenges', (_, gameMode) => {
    const challengesUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'challenges')
    return axiosGet(challengesUrl)
})

ipcMain.handle('axios:getCommands', (_, gameMode) => {
    const challengesUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'commands')
    return axiosGet(challengesUrl)
})

ipcMain.handle('axios:getRuleSet', (_, gameMode) => {
    const rulesetUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'ruleset')
    return axiosGet(rulesetUrl)
})

ipcMain.handle('axios:getMaps', (_, gameMode) => {
    const mapsUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'maps')
    return axiosGet(mapsUrl)
})

ipcMain.handle('axios:getCivModifier', (_, gameMode) => {
    const civUrl = modifierUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__MODIFIER__', 'civs')
    return axiosGet(civUrl)
})

ipcMain.handle('axios:getMapModifier', (_, gameMode) => {
    const mapUrl = modifierUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__MODIFIER__', 'maps')
    return axiosGet(mapUrl)
})
