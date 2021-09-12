<template>
    <div class="profile-container">
        <div class="profile-inner-container">
            <p>Player</p>
            <p>{{ profile.name }}</p>
            <p>{{ profile.points }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import Profile from "@/interfaces/profile";

export default defineComponent({
    name: "UserProfile",
    components: {},
    props: {
        profile: {
            type: Object as PropType<Profile>
        }
    },
    mounted() {
        // Execute on creation
    },
    //data() {
    //    // Data
    //},
    computed: {},
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">
.profile-container {
    height: 70vh;
    background: linear-gradient(90deg, #2c3e50 0%, #435e79 100%);
    padding: 25px;
    border-radius: 15px;
    border: 1px solid rgba(82, 121, 67, 1);;

    .profile-inner-container {
        width: 100%;
        height: 100%;
        flex-wrap: nowrap;
        -webkit-box-shadow: 3px 8px 29px -2px rgba(0, 0, 0, 0.74);
        box-shadow: 3px 8px 29px -2px rgba(0, 0, 0, 0.74);
        background: linear-gradient(90deg, #2c3e50 0%, #435e79 100%);
        color: white;
        padding: 15px;
    }
}
</style>