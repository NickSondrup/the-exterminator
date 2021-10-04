<template>
  <div v-if="currentBug.title">
    <div class="container-fluid">
      <div class="card container bg-dark text-light mt-2">
        <div class="row card-header">
          <div class="col-md-6 text-success">
            <h2 :class="{ 'text-danger': currentBug.closed }">
              {{ currentBug.title }}
            </h2>
          </div>
          <div class="col-md-6">
            <div v-if="currentBug.closed">
              <h2 class="text-danger">
                BUG HAS BEEN CLOSED
              </h2>
            </div>
            <div v-else>
              <div class="text-success">
                <h2 :class="{'text-warning': currentBug.priority === 5 }">
                  Threat Level: {{ currentBug.priority }}
                </h2>
                <h3 v-if="currentBug.priority === 5" class="text-warning">
                  THREAT LEVEL MIDNIGHT
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row card-body">
          <div class="col-md-4">
            <p>
              <b class="text-success">Bug Details:</b> {{ currentBug.description }}
            </p>
            <div v-if="currentBug.closed">
              <p class="text-danger">
                Can't track a dead bug
              </p>
            </div>
            <div v-else>
              <div v-if="trackedCheck">
                <button @click="deleteTrackedBug(account.id)" type="button" class="btn btn-danger">
                  Stop Tracking
                </button>
              </div>
              <div v-else>
                <button @click="createTrackedBug(currentBug.id)" type="button" class="btn btn-success">
                  Track Bug
                </button>
              </div>
            </div>
          </div>
          <div class="d-flex col-md-4">
            <h5>Trackers:</h5>
            <TrackedBug v-for="t in trackedBugs" :key="t.id" :tracked-bug="t" />
          </div>
          <div class="col-md-4">
            <h5>Identifier:</h5>
            <img :src="currentBug.creator.picture" alt="" height="65">
            <p>
              {{ currentBug.creator.name }}
            </p>
            <div v-if="currentBug.closed">
              <p class="text-danger">
                can't edit the dead
              </p>
            </div>
            <div v-else>
              <button v-if="account.id === currentBug.creatorId" type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#edit-form">
                <b>Edit Bug</b>
              </button>
              <button v-if="account.id === currentBug.creatorId" @click="closeBug(currentBug.id)" type="button" class="btn btn-danger mx-1">
                <b>CLOSE BUG</b>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div v-if="currentBug.closed">
            <p class="text-danger">
              BUG HAS BEEN CLOSED
            </p>
          </div>
          <div v-else>
            <div v-if="user.isAuthenticated">
              <form @submit.prevent="createNote()" id="noteForm">
                <div class="form-group">
                  <label for="note"></label>
                  <textarea name="note"
                            id="note"
                            cols="10"
                            rows="5"
                            class="form-control"
                            placeholder="Write a Note"
                            v-model="editable.body"
                  >
                </textarea>
                </div>
                <div class="d-flex justify-content-end my-2">
                  <button type="submit" class="btn btn-success selectable">
                    <b>Submit</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h6>Notes:</h6>
            <Note v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <span>
      ......loading......
    </span>
  </div>
  <Modal id="edit-form">
    <template #modal-title>
      Edit This Bug
    </template>
    <template #modal-body>
      <EditForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import { notesService } from '../services/NotesService.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()

    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
      try {
        await bugsService.getTrackedBugs(route.params.bugId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
      try {
        await bugsService.getBugsNotes(route.params.bugId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
      try {
        await trackedBugsService.checkTracked()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      editable,
      currentBug: computed(() => AppState.currentBug),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      trackedBugs: computed(() => AppState.trackedBugs),
      notes: computed(() => AppState.notes),
      trackedCheck: computed(() => AppState.trackedCheck),

      async createNote() {
        try {
          editable.value.bugId = route.params.bugId
          await notesService.createNote(editable.value)
          document.getElementById('noteForm').reset()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async closeBug(bugId) {
        try {
          window.confirm()
          await bugsService.closeBug(bugId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async createTrackedBug(bugId) {
        try {
          await trackedBugsService.createTrackedBug(bugId)
          await bugsService.getTrackedBugs(this.currentBug.id)
          await trackedBugsService.checkTracked()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteTrackedBug(accountId) {
        try {
          await trackedBugsService.deleteTrackedBug(accountId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
