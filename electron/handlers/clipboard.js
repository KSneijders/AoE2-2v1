const { clipboard } = require('electron')
const {ipcMain} = require('electron');


ipcMain.handle('clipboard:copy', (_, text) => {
    return new Promise(async function (resolve) {
        clipboard.writeText(text);
        resolve();
    });
});
