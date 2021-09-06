<template>
  <div id="layout-container"
       v-bind:style="{backgroundImage: `linear-gradient(to bottom right, rgba(44, 80, 57, 1), rgba(82,121,67,0.8)), url('${this.tabs[selectedTab].bgImage}')`}">
    <div class="layout-tabs">
      <div v-for="(tab, index) in tabs"
           class="tab"
           v-bind:class="{selected: index === selectedTab}"
           @click="selectTab(index)">
        <div>
          <p>{{index === selectedTab ? '> ' : ''}}{{ tab.text }}</p>
        </div>
      </div>
    </div>
    <div id="player-details" class="layout-window"
         v-if="selectedTab === 0">
      <div class="profile-container">
        <Profile />
      </div>
    </div>
    <div id="history" class="layout-window"
         v-if="selectedTab === 1">

    </div>
    <div id="statistics" class="layout-window"
         v-if="selectedTab === 2">

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Profile from "@/components/profile.vue";
import {layoutTabs} from "@/interfaces/layout-tabs";

export default defineComponent({
  name: "layout",
  components: {Profile},
  props: {},
  mounted() {
    // Execute on creation
  },
  data() {
    return {
      selectedTab: 0,
      tabs: [
        {
          "text": "Main menu",
          "bgImage": "https://static.ageofempires.com/aoe/wp-content/uploads/2017/05/AOE2_boxdesktop_1920x1080.jpg",
        },
        {
          "text": "History",
          "bgImage": "https://assets2.rockpapershotgun.com/age-of-empires-2-definitive-edition.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/age-of-empires-2-definitive-edition.jpg",
        },
        {
          "text": "Statistics",
          "bgImage": "https://assets.rockpapershotgun.com/images/2021/01/age-of-empires-2-hivemind-3.jpg",
        },
      ] as layoutTabs
    }
    // Data
  },
  computed: {},
  methods: {
    selectTab: function (index: number): void {
      this.selectedTab = index;
    }
  },
  watch: {}
})

</script>

<style scoped lang="scss">

#layout-container {
  width: 100%;
  padding: 10px;

  .layout-tabs {
    width: 40%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;-webkit-box-shadow: 3px 8px 29px -2px rgba(0,0,0,0.74);
    box-shadow: 3px 8px 29px -2px rgba(0,0,0,0.74);

  }

  .layout-window {
    width: 100%;
    height: 93vh;
    padding: 25px;
    -webkit-box-shadow: 6px 13px 23px -8px rgba(82,121,67,1);
    box-shadow: 6px 13px 23px -8px rgba(82,121,67,1);
    z-index: 5;



    .profile-container {
      width: 40%;
      height: 80vh;
      background-color: #2c3e50;
    }
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
}

</style>