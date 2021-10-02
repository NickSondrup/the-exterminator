import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BugSchema } from '../models/Bug.js'
import { NoteSchema } from '../models/Note.js'
import { TrackedBugSchema } from '../models/TrackedBug.js'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Bugs = mongoose.model('Bug', BugSchema)
  Notes = mongoose.model('Note', NoteSchema)
  TrackedBugs = mongoose.model('TrackedBug', TrackedBugSchema)
}

export const dbContext = new DbContext()
