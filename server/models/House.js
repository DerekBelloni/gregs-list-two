import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    year: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true },
    description: { type: String, required: true },
    creatorId: {
      type: Schema.Types.ObjectId, ref: 'Account'
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)