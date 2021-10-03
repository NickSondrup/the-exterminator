import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'

class NotesService {
  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator', 'name picture')
    return note
  }

  async findNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId)
    return note
  }

  async deleteNote(noteId, userId) {
    const note = await this.findNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await note.remove()
    return note
  }
}

export const notesService = new NotesService()
