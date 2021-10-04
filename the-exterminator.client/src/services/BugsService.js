import { AppState } from '../AppState.js'
import { router } from '../router.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('getBugs', res)
    AppState.bugs = res.data
    AppState.sortedBugs = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    logger.log('createBug', res)
    AppState.bugs.unshift(res.data)
    router.push({ name: 'BugDetails', params: { bugId: res.data.id } })
  }

  async getBugById(bugId) {
    AppState.currentBug = {}
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log('getBugById', res)
    AppState.currentBug = res.data
  }

  async getTrackedBugs(bugId) {
    AppState.trackedBugs = []
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    logger.log('trackedBugs', res)
    AppState.trackedBugs = res.data
    logger.log('tracked bugs in appstate', AppState.trackedBugs)
  }

  async getBugsNotes(bugId) {
    AppState.notes = []
    const res = await api.get(`api/bugs/${bugId}/notes`)
    logger.log('Notes!', res)
    AppState.notes = res.data
  }

  async editBug(edited, bugId) {
    AppState.currentBug = {}
    const res = await api.put(`api/bugs/${bugId}`, edited)
    logger.log('editBug', res)
    AppState.currentBug = res.data
    // this.getBugById(bugId)
  }

  async closeBug(bugId) {
    const res = await api.delete(`api/bugs/${bugId}`)
    logger.log('closeBug', res)
    AppState.currentBug = res.data
  }
}

export const bugsService = new BugsService()
