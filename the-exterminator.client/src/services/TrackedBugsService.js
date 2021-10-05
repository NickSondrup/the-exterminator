import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { AuthService } from './AuthService.js'
import { api } from './AxiosService.js'

class TrackedBugsService {
  async createTrackedBug(bugId) {
    const body = {}
    body.bugId = bugId
    const res = await api.post('api/trackedbugs', body)
    logger.log('createTrackedBug', res)
    AppState.trackedBugs.shift(res.data)
  }

  async checkTracked() {
    AppState.trackedCheck = false
    const accountId = AppState.account.id
    const trackedBugs = AppState.trackedBugs
    for (let i = 0; i < trackedBugs.length; i++) {
      const bug = trackedBugs[i]
      if (bug.accountId === accountId) {
        AppState.trackedCheck = true
      } else { AppState.trackedCheck = false }
      logger.log('checkTracked', AppState.trackedCheck)
    }
  }

  async deleteTrackedBug(accountId) {
    const trackedBugs = AppState.trackedBugs
    const foundBug = trackedBugs.find(t => t.accountId === accountId)
    const res = await api.delete(`api/trackedbugs/${foundBug.id}`)
    logger.log('deleteTrackedBug', res)
    AppState.trackedBugs = AppState.trackedBugs.filter(t => t.id !== foundBug.id)
    this.checkTracked()
  }
}

export const trackedBugsService = new TrackedBugsService()
