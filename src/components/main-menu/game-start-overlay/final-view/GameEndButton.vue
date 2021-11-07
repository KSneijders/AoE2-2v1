<template>
    <div class="button" id="copy-challenges-button" @click="CopyChallenges">
        {{ copyText || "Copy policies" }}
    </div>
    <div class="button" id="game-end-button" @click="GameEndView">
        Game Finished
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "GameEndButton",
    emits: ['game-end-clicked', 'copy-policies'],
    components: {},
    props: {},
    data() {
        return {
            copyText: "",
        }
    },
    mounted() {
        // Execute on creation
    },
    computed: {},
    methods: {
        GameEndView(): void {
            if (confirm("gg wp!\n\nAre you sure the game finished? :)"))
                this.$emit('game-end-clicked');
        },
        CopyChallenges(): void {
            this.$emit('copy-policies');
            this.copyText = "Copied!";
            setTimeout(() => this.copyText = "", 500);
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
.button {
    margin: 5px;
    padding: 5px;
    background: $GREEN_BG_NORMAL;
    box-shadow: 0 2px 5px 1px #2f562d;

    user-select: none;

    &:hover {
        background: $GREEN_BG_HOVER;
        box-shadow: 0 2px 5px 1px #588653;
        cursor: pointer;
    }

    &#copy-challenges-button {
        text-align: center;
        background: $GREY_BG_NORMAL;
        box-shadow: 0 2px 5px 1px #575757;

        &:hover {
            background: $GREY_BG_HOVER;
            box-shadow: 0 2px 5px 1px #969696;
        }
    }
}
</style>
