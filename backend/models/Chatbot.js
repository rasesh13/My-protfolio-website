import mongoose from 'mongoose'

const chatbotSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: [true, 'User message is required'],
      trim: true,
    },
    botResponse: {
      type: String,
      required: [true, 'Bot response is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['general', 'projects', 'skills', 'contact', 'about', 'other'],
      default: 'other',
    },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral',
    },
    ipAddress: {
      type: String,
    },
    sessionId: {
      type: String,
    },
    isHelpful: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
chatbotSchema.index({ sessionId: 1, createdAt: -1 })
chatbotSchema.index({ category: 1 })

export default mongoose.model('Chatbot', chatbotSchema)
