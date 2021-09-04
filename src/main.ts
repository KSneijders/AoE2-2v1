'use strict'

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import {Categories} from "@/interfaces/policies";

createApp(App)
  .use(store)
  .mount('#app');

// Register all exposed variables here (from '/electron/preload.js')
declare global {
    interface Window {
        axios: {
            get(url: string): Promise<Categories>;
        };
    }
}
