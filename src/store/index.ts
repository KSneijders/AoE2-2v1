import {createStore, useStore} from 'vuex'
import {GameModeContent, GameModeMenuItem} from "@/interfaces/game-mode";
import {loadGameMode} from "@/scripts/challenges";

export default createStore({
    state: {
        gameModeInfo: {
            selectedMode: {title: '', id: '', desc: ''} as GameModeMenuItem,
            started: false,
            content: {} as GameModeContent
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
            loadGameMode(state.gameModeInfo.selectedMode.id).then(content => {
                state.gameModeInfo.content = content
            })
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