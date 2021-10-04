import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class TrackedBugsService {
  async createTrackedBug(bugId) {
    const body = {}
    body.bugId = bugId
    const res = await api.post('api/trackedbugs', body)
    logger.log('createTrackedBug', res)
    AppState.trackedBugs.shift(res.data)
  }
}

export const trackedBugsService = new TrackedBugsService()
