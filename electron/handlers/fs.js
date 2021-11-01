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

function readProfileContent(id) {
    let response = fs.readFileSync(`${PROFILES_PATH + id}.json`, 'utf8');
    return JSON.parse(response);
}

function removeProfile(id) {
    try {
        if (profileExists(id)) {
            fs.unlinkSync(`${PROFILES_PATH + id}.json`)
            return !profileExists(id)
        }
    } catch (e) {
        return {'response': e};
    }
    return false;
}

function getProfile(id) {
    if (profileExists(id)) {
        try {
            return readProfileContent(id);
        } catch (e) {
            return {'response': e};
        }
    }
    return {'response': `profile ${id} not found.`}
}

function profileExists(id) {
    return fs.existsSync(`${PROFILES_PATH + id}.json`)
}

function createProfile(id, points) {
    if (!profileExists(id)) {
        let profileData = {
            "name": id,
            "id": id.toLowerCase(),
            "points": points
        };
        return writeProfile(id, profileData)
    } else {
        return false;
    }
}

function writeProfile(id, profile) {
    try {
        fs.writeFileSync(`${PROFILES_PATH + id.toLowerCase()}.json`, JSON.stringify(profile));
        return true;
    } catch (e) {
        return false;
    }
}

function getAllFileNames() {
    return fs.readdirSync(PROFILES_PATH).map(id => id.split('.json')[0]);
}

function p(callable) {
    return new Promise(resolve => resolve(callable()));
}

/** *************************************************************************
 *                          ipcMain Event Functions
 * *************************************************************************/

ipcMain.handle('fs:getProfile', (_, id) => {
    verifyCreateFolders();

    return p(() => {
        createProfile(id, 50);
        return getProfile(id)
    });
})

ipcMain.handle('fs:removeProfile', (_, id) => {
    verifyCreateFolders();

    return p(() => {
        return removeProfile(id)
    });
})

ipcMain.handle('fs:createProfile', (_, id, points) => {
    return p(() => {
        return createProfile(id, points);
    });
})

ipcMain.handle('fs:editProfile', (_, id, key, value) => {
    verifyCreateFolders();

    return p(() => {
        if (profileExists(id)) {
            const profile = getProfile(id);

            if (key === "points") value = parseInt(value)

            profile[key] = value;
            writeProfile(id, profile);

            return true;
        } else {
            return false;
        }
    });
});

ipcMain.handle('fs:adjustProfilePoints', (_, id, value) => {
    verifyCreateFolders();

    return p(() => {
        if (profileExists(id)) {
            const profile = getProfile(id);
            profile['points'] += value;
            writeProfile(id, profile);
            return true;
        } else {
            return false;
        }
    });
});

ipcMain.handle('fs:getProfileIds', () => {
    verifyCreateFolders();

    return p(() => {
        return getAllFileNames();
    })
});

ipcMain.handle('fs:getProfiles', (_, ids) => {
    verifyCreateFolders();

    if (ids.length === 0) {
        ids = getAllFileNames();
    } else {
        ids = ids.filter(n => profileExists(n))
    }

    return p(() => ids.map(n => getProfile(n)));
});
