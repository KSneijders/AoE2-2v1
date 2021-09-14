import {createStore} from 'vuex'
import {GameModeMenuItem} from "@/interfaces/game-mode";

export default createStore({
    state() {
        return {
            selectedGameMode: {title:''} as GameModeMenuItem,
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
