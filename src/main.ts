'use strict'

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";

createApp(App)
  .use(store)
  .mount('#app');

// Register all exposed variables here (from '/electron/preload.js')
declare global {
    interface Window {
        axios: {
            get(url: string): Promise<Challenges | Ruleset>;
        };
    }
}
