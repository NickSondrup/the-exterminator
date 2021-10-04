<template>
  <div v-if="bugs">
    <div class="container">
      <div class="row">
        <Bug v-for="b in bugs" :key="b.id" :bug="b" class="col-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
