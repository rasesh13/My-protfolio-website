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
      socketTimeoutMS: 60000,  // 60 seconds
      serverSelectionTimeoutMS: 10000,  // 10 seconds
      family: 4,  // Use IPv4
      // Vercel specific optimizations
      retryWrites: true,
      w: 'majority',
    })

    cachedConnection = connection
    console.log('✅ MongoDB connected successfully')
    console.log('📊 Connection Pool: min=2, max=10')
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    // Don't exit on error - allow graceful degradation
    console.warn('⚠️  Running in offline mode without database')
  }
}

export default connectDB
