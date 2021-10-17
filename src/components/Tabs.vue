<template>
    <div class="layout-tabs">
        <div v-for="(tab, index) in tabs"
             v-bind:key="index"
             class="tab"
             v-bind:class="{selected: index === selectedTab}"
             @click="selectTab(index)">
            <div>
                <p>{{ tab.title }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import layoutTabs from "@/interfaces/layout-tabs";

export default defineComponent({
    name: "Tabs",
    components: {},
    emits: ['tab-select'],
    props: {},
    mounted() {
        this.selectTab(0);
    },
    data() {
        return {
            selectedTab: 0,
            tabs: [
                {
                    "title": "Main menu",
                    "image": "https://static.ageofempires.com/aoe/wp-content/uploads/2017/05/AOE2_boxdesktop_1920x1080.jpg",
                },
                {
                    "title": "History",
                    "image": "https://assets2.rockpapershotgun.com/age-of-empires-2-definitive-edition.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/age-of-empires-2-definitive-edition.jpg",
                },
                {
                    "title": "Statistics",
                    "image": "https://assets.rockpapershotgun.com/images/2021/01/age-of-empires-2-hivemind-3.jpg",
                },
                {
                    "title": "Profiles",
                    "image": "",
                },
            ] as layoutTabs[]
        }
    },
    computed: {},
    methods: {
        selectTab: function (index: number): void {
            this.selectedTab = index;
            this.$emit('tab-select', this.tabs[index]);
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">

.layout-tabs {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    -webkit-box-shadow: 3px 8px 29px -2px rgba(0, 0, 0, 0.74);
    box-shadow: 3px 8px 29px -2px rgba(0, 0, 0, 0.74);
    margin-bottom: 25px;
}

.tab {
    padding: 10px 10px 0px 10px;
    color: gold;
    font-size: 18px;
    cursor: pointer;

    &.selected {
        font-weight: bold;
        color: white;
    }
}
</style>