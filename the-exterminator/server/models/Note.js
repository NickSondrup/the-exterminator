import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema({
  body: { type: String, required: true, minlength: 3, maxlength: 250 },
  bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
