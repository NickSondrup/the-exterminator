import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
import { bugsService } from './BugsService.js'

class TrackedBugsService {
  async createTrackedBug(body, oldTracked, accountId) {
    const copy = oldTracked.filter(t => t.accountId === accountId)

    if (copy.accountId === accountId) {
      throw new BadRequest("can't track bugs more than once")
    }
    const newTracked = await dbContext.TrackedBugs.create(body)
    await newTracked.populate('bug')
    await newTracked.populate('tracker')
    return newTracked
  }

  async findTrackedById(trackedBugId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    return trackedBug
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedBug = await this.findTrackedById(trackedBugId)
    if (userId !== trackedBug.accountId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await trackedBug.remove()
    return trackedBug
  }
}

export const trackedBugsService = new TrackedBugsService()
