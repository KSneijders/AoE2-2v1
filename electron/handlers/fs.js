const {ipcMain} = require('electron');
const fs = require('fs');


ipcMain.handle('fs:getProfile', (_, NAME) => {

    let PATH = process.env.USERPROFILE+'\\aoe2-profile\\';

    if (!fs.existsSync(`${PATH}`)) fs.mkdirSync(PATH);
    if (!fs.existsSync(`${PATH + NAME}.json`)) {
        let profileData = {
            "name": NAME,
            "points": 25
        }
        fs.appendFileSync(`${PATH + NAME}.json`, JSON.stringify(profileData));
    }

    return new Promise(function (resolve) {
        try {
            let response = fs.readFileSync(`${PATH + NAME}.json`, 'utf8');
                resolve(JSON.parse(response))
        } catch (e) {
            resolve({'response': e})
        }
    });
})


ipcMain.handle('fs:getProfileNames', () => {
    let PATH = process.env.USERPROFILE+'\\aoe2-profile\\';

    let files = fs.readdirSync(PATH);
    let profileNames = [];
    for(let index in files){
        profileNames.push(files[index].split('.json')[0]);
    }
    return profileNames
});
