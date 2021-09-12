<template>
    <div id="main-menu">
        <div id="user-profile">
            <UserProfile :profile="profile" />
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import Profile from "@/interfaces/profile";
import UserProfile from "@/components/main-menu/UserProfile.vue";

export default defineComponent({
    name: "MainMenu",
    components: {UserProfile},
    props: {
        profile: {
            type: Object as PropType<Profile>
        }
    },
    mounted() {
        // Execute on creation
    },
    // data() {
    //   // Data
    // },
    computed: {},
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">
#main-menu {
    #user-profile {
        width: 30%;
    }
}
</style>
