'use strict'

import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import {Challenges, Commands} from "@/interfaces/policies";
import {OnlineLimiters} from "@/interfaces/limiters";
import {Ruleset} from "@/interfaces/ruleset";
import {CivModifier, MapModifier} from "@/interfaces/modifiers";

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
            get(url: string): Promise<never>;
            getChallenges(gameMode: string): Promise<Challenges>;
            getChallengeLimiters(gameMode: string): Promise<OnlineLimiters>;
            getCommands(gameMode: string): Promise<Commands>;
            getRuleSet(gameMode: string): Promise<Ruleset>;
            getCivModifier(gameMode: string): Promise<CivModifier[]>;
            getMapModifier(gameMode: string): Promise<MapModifier[]>;
            getMaps(gameMode: string): Promise<string[]>;
        };
        fs: {
            getProfile(name: string): Promise<Profile>;
            getProfileNames(): Promise<string[]>;
        };
    }
}
