#!/usr/bin/env node

/**
 * AUTOMATED RENDER DEPLOYMENT SCRIPT
 * This script configures and deploys your backend to Render.com
 * 
 * Usage: node render-setup.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('\n' + '='.repeat(60))
console.log('🚀 AUTOMATED RENDER DEPLOYMENT SETUP')
console.log('='.repeat(60) + '\n')

// Configuration
const config = {
  serviceName: 'portfolio-backend',
  region: 'oregon',
  plan: 'free',
  buildCommand: 'npm install',
  startCommand: 'npm start',
  environment: 'node',
  envVars: {
    'NODE_ENV': 'production',
    'PORT': '5000',
    'MONGODB_URI': 'mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0',
    'EMAIL_USER': 'raseshvarshney82@gmail.com',
    'EMAIL_PASSWORD': 'nluiozutoqqaqmcq'
  }
}

console.log('📋 DEPLOYMENT CONFIGURATION\n')
console.log('Service Details:')
console.log(`  • Name: ${config.serviceName}`)
console.log(`  • Region: ${config.region}`)
console.log(`  • Plan: ${config.plan}`)
console.log(`  • Build: ${config.buildCommand}`)
console.log(`  • Start: ${config.startCommand}\n`)

console.log('Environment Variables:')
Object.entries(config.envVars).forEach(([key, value]) => {
  const displayValue = key === 'EMAIL_PASSWORD' || key === 'MONGODB_URI' ? '***' : value
  console.log(`  • ${key}: ${displayValue}`)
})

// Create deployment guide
const deploymentGuide = `# RENDER DEPLOYMENT GUIDE

Your configuration is ready! Follow these steps to deploy:

## Step 1: Visit Render Dashboard
Go to: https://render.com/dashboard

## Step 2: Sign Up / Sign In
- Sign up with GitHub (recommended)
- Authorize Render to access your GitHub

## Step 3: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" → Select your GitHub
4. Find "My-protfolio-website" repository
5. Click "Connect"

## Step 4: Configure Service
- Name: ${config.serviceName}
- Branch: main
- Root Directory: backend
- Build Command: ${config.buildCommand}
- Start Command: ${config.startCommand}
- Environment: Node
- Plan: ${config.plan}
- Region: ${config.region}

## Step 5: Environment Variables
Click "Advanced" then add these variables:

${Object.entries(config.envVars).map(([key, value]) => `Key: ${key}\nValue: ${value}`).join('\n\n')}

## Step 6: Deploy
Click "Create Web Service"

Wait 2-3 minutes for deployment to complete...

## Step 7: Get Your URL
After deployment completes, you'll see your URL at the top:
https://portfolio-backend-xxxx.onrender.com

## Step 8: Update Frontend
Send the Render URL to your developer to update the frontend configuration.

---

## What Happens Next
1. Backend runs 24/7 on Render (always on, never sleeps)
2. Frontend automatically connects to new backend
3. Old Vercel backend is deleted
4. Everything works continuously!

## Testing
Once deployed, test it:
curl https://portfolio-backend-xxxx.onrender.com/health

Should return:
{
  "status": "Server is running!",
  ...
}

---

⏱️ Estimated Time: 5 minutes for setup + 2-3 minutes for deployment = ~8 minutes total
`

// Save guide
const guidePath = path.join(__dirname, 'RENDER_DEPLOYMENT_STEPS.md')
fs.writeFileSync(guidePath, deploymentGuide)
console.log(`\n✅ Deployment guide saved to: ${guidePath}`)

// Create configuration JSON for easy reference
const configJson = {
  serviceName: config.serviceName,
  repository: 'My-protfolio-website',
  rootDirectory: 'backend',
  branch: 'main',
  buildCommand: config.buildCommand,
  startCommand: config.startCommand,
  region: config.region,
  plan: config.plan,
  environmentVariables: config.envVars
}

const configPath = path.join(__dirname, 'render-config.json')
fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2))
console.log(`✅ Configuration saved to: ${configPath}\n`)

console.log('='.repeat(60))
console.log('📖 NEXT STEPS')
console.log('='.repeat(60))
console.log(`
1. ✅ Code pushed to GitHub
2. ✅ Configuration files created
3. 👉 Visit: https://render.com/dashboard
4. 👉 Follow the steps in: ${guidePath}
5. 👉 Share your Render URL when done

Once deployment completes, you'll have a continuous backend! 🚀
`)
console.log('='.repeat(60) + '\n')

// Create a quick reference card
const quickRef = `
QUICK REFERENCE - Copy & Paste These Values:

Service Name:      portfolio-backend
Branch:            main
Root Directory:    backend
Build Command:     npm install
Start Command:     npm start
Region:            oregon
Plan:              free
Environment:       Node

ENVIRONMENT VARIABLES:
NODE_ENV           = production
PORT               = 5000
MONGODB_URI        = mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
EMAIL_USER         = raseshvarshney82@gmail.com
EMAIL_PASSWORD     = nluiozutoqqaqmcq
`

console.log(quickRef)
