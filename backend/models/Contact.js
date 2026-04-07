import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must not exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [100, 'Subject must not exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message must not exceed 2000 characters'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, 'Please provide a valid phone number'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'replied', 'archived'],
      default: 'pending',
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
contactSchema.index({ email: 1 })
contactSchema.index({ createdAt: -1 })

export default mongoose.model('Contact', contactSchema)
