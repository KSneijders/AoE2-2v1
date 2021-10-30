module.exports = {
    // Needs to be '' so that the built html file doesn't output asset filenames with a forward slash.
    publicPath: '',
    configureWebpack: {
        output: {
            // The filenames need to have a ./ otherwise Electron won't be able to find the files.
            filename: './[name].js',
            chunkFilename: './[name].js',
        },
        watchOptions: {
            // Ignore items for webpack rebuilds. Electron reloads aren't affected by this
            // For electron reloads, check electron/main.js (top of the file)
            ignored: [
                'node_modules/**/*',
                'logs/**/*',
                'public/**/*'
            ],
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/styles/_variables.scss";
                @import "@/assets/styles/_classes.scss";
                `
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            // Use this to change the entrypoint of your app's main process
            mainProcessFile: 'electron/main.js',
            // Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
            rendererProcessFile: 'src/main.ts',
            builderOptions: {
                productName: 'AoE2 2v1',
                extraResources: [
                    // {
                    //     "from": "./extraResources/",
                    //     "to": "extraResources",
                    //     "filter": [
                    //         "**/*"
                    //     ]
                    // }
                ]
            }
        }
    }
}
