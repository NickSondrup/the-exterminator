import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Car Id Fool')
    }
    return bug
  }

  async getBugsNotes(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    return notes
  }

  async getTrackedBugs(bugId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId }).populate('bug', 'title priority description closed closedDate creatorId')
    return trackedBugs
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async editBug(bugId, userId, body) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    if (bug.closed === true) {
      throw new Forbidden("you can't kill whats already dead")
    }
    bug.title = body.title || bug.title
    bug.priority = body.priority || bug.priority
    bug.description = body.description || bug.description
    await bug.save()
    return bug
  }

  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
