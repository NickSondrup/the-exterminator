import BaseController from '../utils/BaseController.js'
import { bugsService } from '../services/BugsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getBugsNotes)
      .get('/:bugId/trackedbugs', this.getTrackedBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.closeBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.bugId)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getBugsNotes(req, res, next) {
    try {
      const notes = await bugsService.getBugsNotes(req.params.bugId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedBugs(req, res, next) {
    try {
      const trackedBugs = await bugsService.getTrackedBugs(req.params.bugId)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const bug = await bugsService.closeBug(req.params.bugId, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
