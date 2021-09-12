'use strict'

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Profile from "@/interfaces/profile";


createApp(App)
    .use(store)
    .mount('#app');

// Register all exposed variables here (from '/electron/preload.js')
declare global {
    interface Window {
        axios: {
            get(url: string): Promise<Challenges | Ruleset>;
        };
        fs: {
            getProfile(name: string): Promise<Profile>;
            getProfileNames(): Promise<string>;
        }
    }
}
