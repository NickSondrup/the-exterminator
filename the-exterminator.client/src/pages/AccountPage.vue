<template>
  <div class="about text-center">
    <img class="rounded mt-2" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <h1>Welcome {{ account.name }}</h1>
  </div>
  <div v-if="accountBugs">
    <div class="container">
      <div class="row">
        <AccountBug v-for="b in accountBugs" :key="b.id" :bug="b" class="col-lg-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { accountService } from '../services/AccountService.js'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await accountService.getTrackedBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      accountBugs: computed(() => AppState.accountBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
