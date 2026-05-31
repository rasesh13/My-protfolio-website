#!/usr/bin/env node

/**
 * COMPLETE RENDER DEPLOYMENT VIA CLI
 * Automates: Render login, deployment, and URL retrieval
 * 
 * Usage: 
 *   node deploy-render.js <render-api-key>
 * 
 * Example:
 *   node deploy-render.js rnd_xxxxxxxxxxxxxxxxxxxx
 */

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const apiKey = process.argv[2]

if (!apiKey) {
  console.error('\n❌ ERROR: Please provide your Render API key\n')
  console.log('Usage: node deploy-render.js <render-api-key>')
  console.log('Example: node deploy-render.js rnd_xxxxxxxxxxxxxxxxxxxx\n')
  console.log('📍 Get API key from: https://dashboard.render.com/account/api-tokens\n')
  process.exit(1)
}

console.log('\n' + '='.repeat(70))
console.log('🚀 RENDER DEPLOYMENT AUTOMATION')
console.log('='.repeat(70) + '\n')

const deployConfig = {
  name: 'portfolio-backend',
  repo: 'My-protfolio-website',
  repoUrl: 'https://github.com/rasesh13/My-protfolio-website',
  branch: 'main',
  rootDir: 'backend',
  buildCommand: 'npm install',
  startCommand: 'npm start',
  envVars: {
    NODE_ENV: 'production',
    PORT: '5000',
    MONGODB_URI: 'mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0',
    EMAIL_USER: 'raseshvarshney82@gmail.com',
    EMAIL_PASSWORD: 'nluiozutoqqaqmcq'
  }
}

async function deployToRender() {
  try {
    console.log('📋 Deployment Configuration:')
    console.log(`   • Service: ${deployConfig.name}`)
    console.log(`   • Repository: ${deployConfig.repo}`)
    console.log(`   • Branch: ${deployConfig.branch}`)
    console.log(`   • Root Directory: ${deployConfig.rootDir}`)
    console.log(`   • Build Command: ${deployConfig.buildCommand}`)
    console.log(`   • Start Command: ${deployConfig.startCommand}\n`)

    console.log('🔌 Connecting to Render API...')

    // Get user account info to retrieve ownerID
    let ownerId = null
    try {
      const accountResponse = await axios.get('https://api.render.com/v1/account', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      ownerId = accountResponse.data.id
      console.log(`✅ Retrieved Account ID: ${ownerId}\n`)
    } catch (e) {
      // Try alternative endpoint
      try {
        const teamsResponse = await axios.get('https://api.render.com/v1/organizations', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })
        ownerId = teamsResponse.data[0]?.id
        if (ownerId) console.log(`✅ Retrieved Account ID: ${ownerId}\n`)
      } catch (e2) {
        console.log('⚠️  Could not retrieve account ID, attempting deployment anyway...\n')
      }
    }

    // Create service payload
    const payload = {
      service: {
        name: deployConfig.name,
        ...(ownerId && { ownerId }),
        type: 'web_service',
        environmentId: 'nue',
        plan: 'free',
        region: 'oregon',
        repo: deployConfig.repoUrl,
        repoBranch: deployConfig.branch,
        buildCommand: deployConfig.buildCommand,
        startCommand: deployConfig.startCommand,
        rootDir: deployConfig.rootDir,
        envVars: Object.entries(deployConfig.envVars).map(([key, value]) => ({
          key,
          value,
          isFile: false
        }))
      }
    }

    console.log('📤 Submitting deployment to Render...')
    
    // Create service via Render API
    const response = await axios.post('https://api.render.com/v1/services', payload.service, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    const serviceId = response.data.id
    const serviceName = response.data.name
    const serviceUrl = response.data.notificationEmail ? null : `https://${serviceName}.onrender.com`

    console.log('\n✅ Service Created Successfully!\n')
    console.log(`📌 Service Details:`)
    console.log(`   • ID: ${serviceId}`)
    console.log(`   • Name: ${serviceName}`)
    console.log(`   • Status: ${response.data.status}\n`)

    // Wait for deployment to complete
    console.log('⏳ Waiting for deployment to complete...')
    console.log('   (This usually takes 2-3 minutes)\n')

    let deployed = false
    let attempts = 0
    const maxAttempts = 60 // 5 minutes max

    while (!deployed && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds
      
      try {
        const statusResponse = await axios.get(`https://api.render.com/v1/services/${serviceId}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        })

        const status = statusResponse.data.status
        process.stdout.write(`\r   Status: ${status}... ${attempts + 1}/${maxAttempts}`)

        if (status === 'live') {
          deployed = true
          console.log('\n\n✅ Deployment Complete!\n')
        }
      } catch (error) {
        // Retry on error
      }

      attempts++
    }

    if (!deployed) {
      console.log('\n⚠️  Deployment taking longer than expected.')
      console.log('   Check status at: https://dashboard.render.com/services')
      console.log(`   Service ID: ${serviceId}\n`)
    }

    // Get final service info
    const finalResponse = await axios.get(`https://api.render.com/v1/services/${serviceId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    const finalUrl = finalResponse.data.serviceName 
      ? `https://${finalResponse.data.serviceName}.onrender.com`
      : null

    console.log('=' .repeat(70))
    console.log('🎉 YOUR RENDER BACKEND IS LIVE!\n')
    console.log(`📍 Backend URL: ${finalUrl}`)
    console.log(`   Test: ${finalUrl}/health\n`)

    // Save configuration
    const config = {
      renderUrl: finalUrl,
      serviceId: serviceId,
      serviceName: serviceName,
      deployedAt: new Date().toISOString(),
      repository: deployConfig.repo,
      branch: deployConfig.branch
    }

    const configPath = path.join(__dirname, 'render-deployed.json')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(`✅ Configuration saved to: render-deployed.json\n`)

    console.log('=' .repeat(70))
    console.log('📝 NEXT STEPS\n')
    console.log('1. Run frontend update:')
    console.log(`   node update-frontend.js ${finalUrl}\n`)
    console.log('2. Commit and push changes:')
    console.log('   git add frontend/src/config/api.js')
    console.log('   git commit -m "Update backend URL to Render"')
    console.log('   git push origin main\n')
    console.log('3. Redeploy frontend on Vercel:')
    console.log('   node vercel-redeploy.js <vercel-token>\n')
    console.log('4. Delete old Vercel backend (manual):')
    console.log('   https://vercel.com/dashboard\n')
    console.log('=' .repeat(70) + '\n')

    return config

  } catch (error) {
    console.error('\n❌ Deployment Failed!\n')
    
    if (error.response) {
      console.error('Error Response:', error.response.data)
      console.error('Status:', error.response.status)
    } else if (error.request) {
      console.error('Error:', error.message)
      console.error('No response received from Render API')
    } else {
      console.error('Error:', error.message)
    }

    console.log('\n📍 Troubleshooting:')
    console.log('   • Check API key is valid')
    console.log('   • Check GitHub token on Render account')
    console.log('   • Verify repository is accessible')
    console.log('   • Try again in a few moments\n')

    process.exit(1)
  }
}

// Run deployment
await deployToRender()
