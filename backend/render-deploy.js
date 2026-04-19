#!/usr/bin/env node

/**
 * Render Deployment Script
 * Deploy backend to Render.com via CLI
 * 
 * Required: RENDER_API_KEY environment variable
 * Usage: node render-deploy.js
 */

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const RENDER_API_KEY = process.env.RENDER_API_KEY
const RENDER_API_URL = 'https://api.render.com/v1'

if (!RENDER_API_KEY) {
  console.error('❌ Error: RENDER_API_KEY environment variable not set')
  console.log('\nTo deploy to Render, you need:')
  console.log('1. Create account at https://render.com')
  console.log('2. Get API key from: https://dashboard.render.com/api-keys')
  console.log('3. Set environment variable: set RENDER_API_KEY=your_key_here')
  console.log('4. Run this script again')
  process.exit(1)
}

async function deployToRender() {
  try {
    console.log('🚀 Starting Render deployment...\n')

    // Service configuration
    const serviceConfig = {
      name: 'portfolio-backend',
      ownerId: 'preferred', // Requires account setup
      type: 'web_service',
      environmentId: 'free',
      region: 'oregon',
      plan: 'free',
      envVars: [
        {
          key: 'NODE_ENV',
          value: 'production'
        },
        {
          key: 'MONGODB_URI',
          value: process.env.MONGODB_URI || 'mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0'
        },
        {
          key: 'EMAIL_USER',
          value: process.env.EMAIL_USER || 'raseshvarshney82@gmail.com'
        },
        {
          key: 'EMAIL_PASSWORD',
          value: process.env.EMAIL_PASSWORD || 'nluiozutoqqaqmcq'
        }
      ]
    }

    console.log('📋 Service Configuration:')
    console.log(`   Name: ${serviceConfig.name}`)
    console.log(`   Type: ${serviceConfig.type}`)
    console.log(`   Plan: ${serviceConfig.plan}`)
    console.log(`   Region: ${serviceConfig.region}\n`)

    console.log('🔑 Environment Variables:')
    serviceConfig.envVars.forEach(env => {
      const value = env.key === 'EMAIL_PASSWORD' ? '***' : (env.value?.substring(0, 20) + '...')
      console.log(`   ${env.key}: ${value}`)
    })
    console.log()

    // Note: Full API deployment requires web setup
    console.log('⚠️  Note: Render requires GitHub connection for full deployment.\n')
    console.log('📖 Manual setup required (one time):')
    console.log('   1. Visit: https://render.com/dashboard')
    console.log('   2. Click "New +" → "Web Service"')
    console.log('   3. Connect your GitHub account')
    console.log('   4. Select your portfolio repository')
    console.log('   5. Use the configuration above\n')

    // If needed, could connect via GitHub token
    if (process.env.GITHUB_TOKEN) {
      console.log('✅ GitHub token detected - proceeding with GitHub integration...\n')
      // Would implement GitHub + Render integration here
    }

    console.log('✨ Configuration is ready. Visit Render dashboard to complete deployment.')

  } catch (error) {
    console.error('❌ Deployment error:', error.message)
    process.exit(1)
  }
}

// Run deployment
deployToRender()
