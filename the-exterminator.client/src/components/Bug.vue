<template>
  <div>
    <div class="d-flex card bg-dark m-2 text-light p-2">
      <div class="text-success">
        <h4 :class="{'text-danger': bug.closed }">
          Bug Title: {{ bug.title }}
        </h4>
      </div>
      <div>
        <h4> Bug Description: </h4>
        <span>{{ bug.description }}</span>
      </div>
      <div v-if="bug.closed">
        <h4 class="text-danger">
          BUG HAS BEEN CLOSED
        </h4>
      </div>
      <div v-else class="text-success">
        <h4 :class="{'text-warning': bug.priority === 5 }">
          Threat Level: {{ bug.priority }}
        </h4>
      </div>
      <div class="m-auto">
        <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
          <button class="btn btn-success">
            Bug Details
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
