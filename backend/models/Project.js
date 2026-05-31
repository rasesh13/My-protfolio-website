import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [1000, 'Description must not exceed 1000 characters'],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description must not exceed 200 characters'],
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
    },
    images: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: ['web', 'mobile', 'fullstack', 'ai', 'other'],
      default: 'web',
    },
    liveLink: {
      type: String,
      trim: true,
      match: [/^(https?:\/\/)/, 'Please provide a valid URL'],
    },
    githubLink: {
      type: String,
      trim: true,
      match: [/^(https?:\/\/)/, 'Please provide a valid URL'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'draft'],
      default: 'active',
    },
    year: {
      type: Number,
      min: 2000,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
projectSchema.index({ featured: -1, createdAt: -1 })
projectSchema.index({ category: 1 })
projectSchema.index({ status: 1 })

export default mongoose.model('Project', projectSchema)
