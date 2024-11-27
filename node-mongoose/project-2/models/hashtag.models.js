import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema({
  hashtag: {
    type: String
  },
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
}, { timestamps: true });

export const Hashtag = mongoose.model('Hashtag', hashtagSchema)