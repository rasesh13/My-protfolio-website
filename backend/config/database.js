import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Reuse connection if it already exists
let cachedConnection = null

const connectDB = async () => {
  try {
    // Return cached connection if available
    if (cachedConnection) {
      console.log('♻️  Reusing cached MongoDB connection')
      return cachedConnection
    }

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
    
    console.log('🔗 Connecting to MongoDB...')
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      connectionTimeoutMS: 10000,
    })

    cachedConnection = connection
    console.log('✅ MongoDB connected successfully')
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    // Don't exit on error - allow graceful degradation
    console.warn('⚠️  Running in offline mode without database')
  }
}

export default connectDB
