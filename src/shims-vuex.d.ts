// vuex-shim.d.ts

import {Store} from 'vuex'
import {GameModeContent, GameModeMenuItem} from "@/interfaces/game-mode";

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
        gameModeInfo: {
            started: boolean;
            selectedMode: GameModeMenuItem;
            content: GameModeContent;
        };
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
