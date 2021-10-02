import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BugSchema = new Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 30 },
  priority: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true, minlength: 3, maxlength: 150 },
  closed: { type: Boolean, required: true, default: false },
  closedDate: { type: Date, required: false },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: false }
  // NOTE                                                             ^^^^^ this may need to be false
},
{ timestamps: true, toJSON: { virtuals: true } }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
