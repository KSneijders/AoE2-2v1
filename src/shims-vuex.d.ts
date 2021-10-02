// vuex-shim.d.ts

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import {GameModeMenuItem} from "@/interfaces/game-mode";

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
        gameModeInfo: {
            started: boolean;
            selectedMode: GameModeMenuItem;
        };
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
