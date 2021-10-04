<template>
  <div class="d-flex">
    <img :src="note.creator.picture" alt="" height="50">
    <p><b>{{ note.creator.name }}:</b>  {{ note.body }}</p>
    <div v-if="account.id === note.creatorId">
      <i class="mdi mdi-delete-forever text-danger f-20 selectable m-0" @click="deleteNote(note.id)"></i>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { notesService } from '../services/NotesService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(noteId)
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
