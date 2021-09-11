import {createStore} from 'vuex'
import {GameModeMenuItem} from "@/interfaces/game-mode";

export default createStore({
    state() {
        return {
            selectedGameModeIndex: {title:''} as GameModeMenuItem,
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
