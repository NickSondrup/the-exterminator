<template>
  <div class="mx-1">
    <img :src="trackedBug.tracker.picture"
         alt=""
         height="50"
         class="mt-2 rounded-circle"
         :aria-label="trackedBug.tracker.name"
         :title="trackedBug.tracker.name"
    >
  </div>
  <!-- <div>
    <p>{{ trackedBug.tracker.name }}</p>
  </div> -->
</template>

<script>
export default {
  props: {
    trackedBug: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
