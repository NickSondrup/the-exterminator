import { dbContext } from '../db/DbContext.js'

class TrackedBugsService {
  async createTrackedBug(body) {
    const newTracked = await dbContext.TrackedBugs.create(body)
    await newTracked.populate('bug')
    await newTracked.populate('tracker')
    return newTracked
  }
}

export const trackedBugsService = new TrackedBugsService()
