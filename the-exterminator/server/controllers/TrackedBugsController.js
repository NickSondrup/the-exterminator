import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newTracked = await trackedBugsService.createTrackedBug(req.body)
      res.send(newTracked)
    } catch (error) {
      next(error)
    }
  }
}
