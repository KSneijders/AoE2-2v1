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

async function getUrl(url) {
    return axiosGet(url).then(data => {
        return data
    }).catch(() => {
        console.warn(`Error retrieving '${url}'`)
        return undefined
    })
}

ipcMain.handle('axios:get', async (_, url) => {
    return getUrl(url)
})

ipcMain.handle('axios:getChallenges', (_, gameMode) => {
    const challengesUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'challenges')
    return getUrl(challengesUrl)
})

ipcMain.handle('axios:getChallengeLimiters', (_, gameMode) => {
    const challengesUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'challenge-limiters')
    return getUrl(challengesUrl)
})

ipcMain.handle('axios:getCommands', (_, gameMode) => {
    const challengesUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'commands')
    return getUrl(challengesUrl)
})

ipcMain.handle('axios:getRuleSet', (_, gameMode) => {
    const rulesetUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'ruleset')
    return getUrl(rulesetUrl)
})

ipcMain.handle('axios:getMaps', (_, gameMode) => {
    const mapsUrl = gameModeUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__FILE__', 'maps')
    return getUrl(mapsUrl)
})

ipcMain.handle('axios:getCivModifier', (_, gameMode) => {
    const civUrl = modifierUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__MODIFIER__', 'civs')
    return getUrl(civUrl)
})

ipcMain.handle('axios:getMapModifier', (_, gameMode) => {
    const mapUrl = modifierUrl
        .replace('__GAME_MODE__', gameMode)
        .replace('__MODIFIER__', 'maps')
    return getUrl(mapUrl)
})
