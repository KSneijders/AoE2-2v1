const {ipcMain} = require('electron');
const fs = require('fs');

const FOLDERS = ['profiles'];
const USER_PROFILE = process.env.USERPROFILE;
const ROOT_2V1_PATH = `${USER_PROFILE}\\aoe2-2v1\\`
const PROFILES_PATH = `${ROOT_2V1_PATH}\\profiles\\`

function verifyCreateFolders() {
    if (!fs.existsSync(ROOT_2V1_PATH)) fs.mkdirSync(ROOT_2V1_PATH);
    for (const folder of FOLDERS) {
        let path = `${ROOT_2V1_PATH}\\${folder}\\`
        if (!fs.existsSync(path)) fs.mkdirSync(path);
    }
}

/** *************************************************************************
 *                           Profile Functions
 * *************************************************************************/

function readProfileContent(name) {
    let response = fs.readFileSync(`${PROFILES_PATH + name}.json`, 'utf8');
    return JSON.parse(response);
}

function getProfile(name) {
    if (profileExists(name)) {
        try {
            return readProfileContent(name);
        } catch (e) {
            return {'response': e};
        }
    }
    return {'response': `profile ${name} not found.`}
}

function profileExists(name) {
    return fs.existsSync(`${PROFILES_PATH + name}.json`)
}

function createProfile(name, points) {
    if (!profileExists(name)) {
        let profileData = {
            "name": name,
            "points": points
        };
        return writeProfile(name, profileData)
    } else {
        return false;
    }
}

function writeProfile(name, profile) {
    try {
        fs.writeFileSync(`${PROFILES_PATH + name}.json`, JSON.stringify(profile));
        return true;
    } catch (e) {
        return false;
    }
}

function p(callable) {
    return new Promise(resolve => resolve(callable()));
}

/** *************************************************************************
 *                          ipcMain Event Functions
 * *************************************************************************/

ipcMain.handle('fs:getProfile', (_, name) => {
    verifyCreateFolders();

    return p(() => {
        createProfile(name, 25);
        return getProfile(name)
    });
})

ipcMain.handle('fs:editProfile', (_, name, key, value) => {
    verifyCreateFolders();

    return p(() => {
        if (profileExists(name)) {
            const profile = getProfile(name);
            profile[key] = value;
            writeProfile(name, profile);

            return true;
        } else {
            return false;
        }
    });
});

ipcMain.handle('fs:getProfileNames', () => {
    verifyCreateFolders();

    let files = fs.readdirSync(PROFILES_PATH);
    let profileNames = [];
    for (let index in files) {
        profileNames.push(files[index].split('.json')[0]);
    }
    return profileNames
});

ipcMain.handle('fs:getProfiles', (_, names) => {
    verifyCreateFolders();

    return p(() => names.filter(n => profileExists(n)).map(n => getProfile(n)));
});
