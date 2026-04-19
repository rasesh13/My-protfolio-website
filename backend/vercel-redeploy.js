#!/usr/bin/env node

/**
 * VERCEL FRONTEND REDEPLOY VIA CLI
 * Redeployes frontend after backend URL update
 * 
 * Usage:
 *   node vercel-redeploy.js <vercel-token>
 * 
 * Example:
 *   node vercel-redeploy.js VercelTokenHere
 */

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vercelToken = process.argv[2]

if (!vercelToken) {
  console.error('\n❌ ERROR: Please provide your Vercel token\n')
  console.log('Usage: node vercel-redeploy.js <vercel-token>')
  console.log('Example: node vercel-redeploy.js VercelTokenHere\n')
  console.log('📍 Get token from: https://vercel.com/account/tokens\n')
  process.exit(1)
}

console.log('\n' + '='.repeat(70))
console.log('🔄 VERCEL FRONTEND REDEPLOY')
console.log('='.repeat(70) + '\n')

async function redeploy() {
  try {
    console.log('🔌 Connecting to Vercel API...\n')

    // Get projects
    const projectsResponse = await axios.get('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${vercelToken}`
      }
    })

    // Find portfolio frontend project
    const portfolioProject = projectsResponse.data.projects.find(p => p.name === 'portfolio')

    if (!portfolioProject) {
      console.error('❌ ERROR: Could not find "portfolio" project on Vercel\n')
      console.error('Available projects:')
      projectsResponse.data.projects.forEach(p => {
        console.error(`  • ${p.name}`)
      })
      console.error()
      process.exit(1)
    }

    console.log(`📌 Found project: ${portfolioProject.name}`)
    console.log(`   ID: ${portfolioProject.id}`)
    console.log(`   URL: https://${portfolioProject.domains[0]}\n`)

    // Trigger redeploy
    console.log('⏳ Triggering redeploy...\n')

    const deployResponse = await axios.post(
      `https://api.vercel.com/v13/deployments`,
      {
        name: portfolioProject.name,
        gitSource: {
          type: 'github',
          org: 'rasesh13',
          repo: 'My-protfolio-website',
          ref: 'main'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const deploymentId = deployResponse.data.id
    const deploymentUrl = deployResponse.data.url

    console.log(`✅ Redeploy Triggered!\n`)
    console.log(`📌 Deployment Details:`)
    console.log(`   • ID: ${deploymentId}`)
    console.log(`   • URL: https://${deploymentUrl}\n`)

    // Wait for deployment
    console.log('⏳ Waiting for deployment to complete...')
    console.log('   (This usually takes 2-3 minutes)\n')

    let completed = false
    let attempts = 0
    const maxAttempts = 60

    while (!completed && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000))

      try {
        const statusResponse = await axios.get(
          `https://api.vercel.com/v13/deployments/${deploymentId}`,
          {
            headers: {
              Authorization: `Bearer ${vercelToken}`
            }
          }
        )

        const state = statusResponse.data.state
        process.stdout.write(`\r   Status: ${state}... ${attempts + 1}/${maxAttempts}`)

        if (state === 'READY') {
          completed = true
          console.log('\n\n✅ Frontend Redeploy Complete!\n')
        } else if (state === 'ERROR' || state === 'CANCELED') {
          console.error(`\n\n❌ Deployment ${state}!\n`)
          process.exit(1)
        }
      } catch (error) {
        // Retry
      }

      attempts++
    }

    console.log('=' .repeat(70))
    console.log('🎉 FRONTEND REDEPLOYED SUCCESSFULLY!\n')
    console.log(`📍 Frontend URL: https://${deploymentUrl}\n`)

    console.log('=' .repeat(70))
    console.log('📝 FINAL STEPS\n')
    console.log('1. ✅ Backend deployed to Render')
    console.log('2. ✅ Frontend redeployed on Vercel')
    console.log('3. 👉 Delete old Vercel backend (manual):\n')
    console.log('   Visit: https://vercel.com/dashboard')
    console.log('   Find: "backend" project')
    console.log('   Click: Settings → Danger Zone → Delete')
    console.log('   Confirm: Click Delete\n')
    console.log('4. 👉 Test your portfolio:\n')
    console.log(`   Visit: https://${deploymentUrl}`)
    console.log('   Fill contact form')
    console.log('   Verify email received\n')
    console.log('=' .repeat(70) + '\n')

  } catch (error) {
    console.error('\n❌ Redeploy Failed!\n')
    
    if (error.response) {
      console.error('Error:', error.response.data.error?.message || error.response.data)
    } else {
      console.error('Error:', error.message)
    }

    console.log('\n📍 Troubleshooting:')
    console.log('   • Check Vercel token is valid and has correct permissions')
    console.log('   • Verify project name is "portfolio"')
    console.log('   • Try again in a few moments\n')

    process.exit(1)
  }
}

// Run redeploy
await redeploy()
