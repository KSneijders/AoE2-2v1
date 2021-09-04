const {ipcMain} = require('electron')
const axios = require("axios");

ipcMain.handle('axios:get', (_, args) => {
    const url = args
    console.log(args)
    return new Promise(async function (resolve) {
        try {
            const response = await axios.get(url)
            console.log(response)
            resolve({'response': response.data})
        } catch (e) {
            console.log("CATCH")
            resolve({'response': e})
        }
    });
})
