import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'
import { bugsService } from '../services/BugsService.js'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const oldTracked = await bugsService.getTrackedBugs(req.body.bugId)
      const newTracked = await trackedBugsService.createTrackedBug(req.body, oldTracked, req.userInfo.id)
      res.send(newTracked)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(req, res, next) {
    try {
      // if (req.userInfo.id !== req.params.trackedBugId) {
      //   throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
      // } else {
      const trackedBug = await trackedBugsService.deleteTrackedBug(req.params.trackedBugId, req.userInfo.id)
      res.send(trackedBug)
      // }
    } catch (error) {
      next(error)
    }
  }
}
