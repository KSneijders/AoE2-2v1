import {createStore} from 'vuex'
import {GameModeMenuItem} from "@/interfaces/game-mode";

export default createStore({
    state: {
        gameModeInfo: {
            selectedMode: {title: '', id: '', desc: ''} as GameModeMenuItem,
            started: false
        }
    },
    getters: {
        gameModeSelected(state): boolean {
            return !!state.gameModeInfo.selectedMode?.id || false;
        },
        selectedGameModeId(state): string {
            return state.gameModeInfo.selectedMode?.id || "";
        },
        selectedGameModeTitle(state): string {
            return state.gameModeInfo.selectedMode?.title || "<< None >>";
        }
    },
    mutations: {
        gameModeStart(state) {
            state.gameModeInfo.started = true;
        },
        gameModeEnd(state) {
            state.gameModeInfo.started = false;
        },
        selectGameMode(state, newMode: GameModeMenuItem) {
            state.gameModeInfo.selectedMode = newMode;
        }
    },
    actions: {},
    modules: {},
})
