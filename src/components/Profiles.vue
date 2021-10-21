<template>
    <div id="profile-list" class="simple-white-scrollbar block">
        <h5>Profiles</h5>
        <div v-for="(profile, index) of profiles"
             v-bind:key="profile.name"
             @click="selectedProfileIndex=index"
             v-bind:class="{'selected': selectedProfileIndex === index}"

             class="profile-entry"
        >
            {{ profile.name }}
            <span v-if="profile.id === 'default'" class="you-identifier">(You)</span>
            ({{ profile.points }})
        </div>
    </div>
    <div id="player-inspection" class="block" v-if="selectedProfile">
        <h5>Information</h5>
        <table>
            <tr>
                <td>Name:</td>
                <td>{{ selectedProfile.name }}</td>
                <td>
                    <input placeholder="Update name"
                           type="text"
                           v-bind:value="selectedProfile.name"
                           @keyup.enter="updateValue($event, 'name')"
                    />
                </td>
            </tr>
            <tr>
                <td>Points:</td>
                <td>{{ selectedProfile.points }}</td>
                <td>
                    <input placeholder="Update points"
                           type="number"
                           v-bind:value="selectedProfile.points"
                           @keyup.enter="updateValue($event, 'points')"
                    />
                </td>
            </tr>
        </table>
        <div id="delete-profile"
             @click="removeProfile"
             v-if="selectedProfile.id !== 'default'"
        >
            Remove profile
        </div>
    </div>
    <div id="new-profile" class="block">
        <h5>New Profile</h5>
        <form v-on:submit.prevent="submitNewProfile($event)">
            <input placeholder="Profile name" type="text"> <br/>
            <input placeholder="Points" type="number"> <br/>
            <button>Add profile</button>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Profile} from "@/interfaces/profile";
import {stripIllegalChars} from "@/scripts/strings";

export default defineComponent({
    name: "Profiles",
    components: {},
    props: {},
    mounted() {
        window.fs.getProfiles().then((names) => {
            this.profiles = names;
        })
    },
    data() {
        return {
            profiles: [] as Profile[],
            selectedProfileIndex: -1
        }
    },
    computed: {
        selectedProfile (): Profile | undefined {
            if (this.selectedProfileIndex === -1) return;
            return this.profiles[this.selectedProfileIndex];
        }
    },
    methods: {
        removeProfile(): void {
            if (!this.selectedProfile || this.selectedProfile.id === 'default') return
            if (!confirm(`Are you sure you want to remove the ${this.selectedProfile.name} profile?`)) return;

            const profileId: string = this.selectedProfile.id;
            window.fs.removeProfile(this.selectedProfile.id).then(success => {
                if (success) {
                    this.selectedProfileIndex = -1;
                    this.profiles = this.profiles.filter(p => p.id !== profileId)
                }
            })
        },
        updateValue ($event: KeyboardEvent, key: string): void {
            let value: string | null = ($event.target as HTMLInputElement).value;
            if (!value || !this.selectedProfile) return;

            if (key === "name") value = stripIllegalChars(value)

            const profile: Profile = this.selectedProfile;

            window.fs.editProfile(this.selectedProfile.id, key, value).then(success => {
                if (success && value) {
                    profile[key] = value

                    if (this.$store.state.user.id === profile.id) {
                        this.$store.state.user = profile;
                    }
                }
            })
        },
        submitNewProfile($event: Event) {
            const target: HTMLFormElement = $event.target as HTMLFormElement
            const nameInput: HTMLInputElement = target[0] as HTMLInputElement
            const pointInput: HTMLInputElement = target[1] as HTMLInputElement

            const name: string = stripIllegalChars(nameInput.value)

            if (!name || !pointInput.value) return
            window.fs.createProfile(name, parseInt(pointInput.value)).then(success => {
                if (success) {
                    window.fs.getProfile(name).then(profile => {
                        this.profiles.push(profile);
                        this.selectedProfileIndex = this.profiles.length - 1;
                    })

                    nameInput.value = "";
                    pointInput.value = "";
                }
            })
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
.block {
    border: 3px solid $BLUE_BORDER_COLOUR;
    background: $LIGHT_BLUE_BG;
    display: inline-block;
    padding: 10px;
    height: 100%;
    margin-right: 50px;
}

#new-profile {
    display: block;
    width: 30%;

    input {
        margin-bottom: 5px;
    }
}

#player-inspection {
    width: 60%;
    float: right;

    table {
        td {
            min-width: 120px;
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    input {
        padding: 2px;
    }

    #delete-profile {
        padding: 5px;
        color: white;
        float: right;
        background: $RED_BG_NORMAL;
        border: 1px solid #942020;
        user-select: none;

        &:hover {
            cursor: pointer;
            background: $RED_BG_HOVER;
            border: 1px solid #c54646;
        }
    }
}

#profile-list {
    width: 30%;

    .profile-entry {
        width: 80%;
        background: $BLUE_BG_NORMAL;
        border: 2px solid #7696b6;
        color: white;
        padding: 10px;
        margin: 0 0 5px 0;
        font-size: 16px;
        transition: width .25s;

        .you-identifier {
        }

        &:hover {
            background: $BLUE_BG_HOVER;
            border: 2px solid #b5c4d9;
            cursor: pointer;
            width: 90%;
        }

        &.selected {
            background: $GREEN_BG_NORMAL;

            &:hover {
                background: $GREEN_BG_HOVER;
            }
        }
    }
}

</style>
