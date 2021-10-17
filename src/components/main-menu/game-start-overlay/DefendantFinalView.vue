<template>
    <div></div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";

export default defineComponent({
    name: "DefendantFinalView",
    components: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    props: {},
    data() {
        // Data
    },
    mounted() {
        // Execute on creation
    },
    computed: {},
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">

</style>
