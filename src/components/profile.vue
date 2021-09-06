<template>
  <div class="player-details">
    The profile will be shown here
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "profile",
  components: {},
  props: {},
  mounted() {
    // Execute on creation
  },
  data() {
    // Data
  },
  computed: {},
  methods: {},
  watch: {}
})

</script>

<style scoped lang="scss">
  .player-details {
    color: white;
    padding: 15px;
  }
</style>