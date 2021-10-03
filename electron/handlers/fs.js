const {ipcMain} = require('electron');
const fs = require('fs');

const USER_PROFILE = process.env.USERPROFILE;
const ROOT_2V1_PATH = `${USER_PROFILE}\\aoe2-2v1\\`
const FOLDERS = ['profiles'];

function verifyCreateFolders() {
    if (!fs.existsSync(ROOT_2V1_PATH)) fs.mkdirSync(ROOT_2V1_PATH);
    for (const folder of FOLDERS) {
        let path = `${ROOT_2V1_PATH}\\${folder}\\`
        if (!fs.existsSync(path)) fs.mkdirSync(path);
    }
}

ipcMain.handle('fs:getProfile', (_, name) => {
    verifyCreateFolders();

    const PROFILES_PATH = `${ROOT_2V1_PATH}\\profiles\\`

    if (!fs.existsSync(`${PROFILES_PATH + name}.json`)) {
        let profileData = {
            "name": name,
            "points": 25
        }
        fs.appendFileSync(`${PROFILES_PATH + name}.json`, JSON.stringify(profileData));
    }

    return new Promise(function (resolve) {
        try {
            let response = fs.readFileSync(`${PROFILES_PATH + name}.json`, 'utf8');
                resolve(JSON.parse(response))
        } catch (e) {
            resolve({'response': e})
        }
    });
})


ipcMain.handle('fs:getProfileNames', () => {
    const PROFILES_PATH = `${ROOT_2V1_PATH}\\profiles\\`

    let files = fs.readdirSync(PROFILES_PATH);
    let profileNames = [];
    for(let index in files){
        profileNames.push(files[index].split('.json')[0]);
    }
    return profileNames
});


ipcMain.handle('fs:getProfiles', () => {

});
