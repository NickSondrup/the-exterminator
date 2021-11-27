
export class Bug {
  constructor(bugData = {}) {
    this.title = bugData.title
    this.priority = bugData.priority
    this.description = bugData.description
    this.closed = bugData.closed
    this.closedDate = bugData.closedDate
    this.creatorId = bugData.creatorId
  }
}
