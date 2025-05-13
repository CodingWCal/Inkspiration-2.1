const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  medium: String,
  theme: String,
  mood: String,
  colorPalette: [String],
  image: String,
  cloudinaryId: String,
  currentStage: String,
  likes: {
  type: Number,
  default: 0
  },
  stages: [
    {
      type: { type: String, enum: ['concept', 'draft', 'final'] },
      content: String,
      image: String,
      date: Date
    }
  ],
  goals: [String],
  completed: Boolean,
  private: { type: Boolean, default: false }, // added private/public toggle button for artists in inkspiration, to make project private/public true or false
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
