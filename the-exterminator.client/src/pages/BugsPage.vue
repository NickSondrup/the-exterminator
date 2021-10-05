<template>
  <div v-if="bugs">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <button type="button" class="btn btn-success m-2" @click="closedFilter = !closedFilter">
            Filter
          </button>
          <button v-if="sorted === false" type="button" class="btn btn-warning m-2" @click="sortBugs()">
            Sort by Threat
          </button>
          <button v-if="sorted === true" type="button" class="btn btn-warning m-2" @click="toggleAscending()">
            Sort by Threat
          </button>
          <button @click="unsortBugs()" class="btn btn-success">
            sort by Most Recent
          </button>
        </div>
        <div v-if="sorted === false" class="row">
          <Bug v-for="b in bugs" :key="b.id" :bug="b" class="col-lg-4" />
        </div>
        <div v-if="sorted === true" class="row">
          <Bug v-for="b in sortedBugs" :key="b.id" :bug="b" class="col-lg-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
export default {
  name: 'Home',
  setup() {
    const closedFilter = ref(false)
    const ascending = ref(true)
    const sorted = ref(false)
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })

    function closedFilterFunction(b) {
      if (closedFilter.value) {
        return b.closed === false
      }
      return true
    }

    function bugSorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    return {
      closedFilter,
      sorted,
      bugs: computed(() => AppState.bugs.filter(closedFilterFunction)),
      sortedBugs: computed(() => AppState.sortedBugs.sort(bugSorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      },
      sortBugs() {
        sorted.value = true
      },
      async unsortBugs() {
        sorted.value = false
        await bugsService.getBugs()
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
