<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title"></label>
      <input v-model="editable.title"
             type="text"
             name="title"
             id="title"
             placeholder="Bug Title"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="priority"></label>
      <input v-model="editable.priority"
             name="priority"
             id="priority"
             class="form-control"
             type="number"
             placeholder="Threat Level 1-5"
      >
      <!-- <option disabled selected value="">
          Threat Level
        </option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select> -->
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input v-model="editable.description"
             type="text"
             name="description"
             id="description"
             placeholder="Project Description"
             class="form-control"
      >
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-success selectable mt-4">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createBug() {
        try {
          await bugsService.createBug(editable.value)
          editable.value = {}
          Pop.toast('Bug Ready To Be Purged!', 'success')
          const modal = Modal.getInstance(document.getElementById('bug-form'))
          modal.hide()
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
