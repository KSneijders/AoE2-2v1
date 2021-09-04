const {ipcMain} = require('electron')
const axios = require("axios");

ipcMain.handle('axios:get', (_, args) => {
    const url = args
    return new Promise(async function (resolve) {
        try {
            const response = await axios.get(url)
            resolve(response.data)
        } catch (e) {
            resolve({'response': e})
        }
    });
})
