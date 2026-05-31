#!/usr/bin/env node

/**
 * MASTER DEPLOYMENT AUTOMATION
 * Complete end-to-end deployment via CLI
 * 
 * Usage:
 *   node full-deploy.js <render-api-key> <vercel-token>
 * 
 * Example:
 *   node full-deploy.js rnd_xxxx VercelTokenHere
 */

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const renderKey = process.argv[2]
const vercelToken = process.argv[3]

console.log('\n' + '█'.repeat(75))
console.log('█' + ' '.repeat(73) + '█')
console.log('█' + '  🚀 COMPLETE PORTFOLIO MIGRATION TO RENDER (CLI AUTOMATED)'.padEnd(74) + '█')
console.log('█' + ' '.repeat(73) + '█')
console.log('█'.repeat(75) + '\n')

if (!renderKey || !vercelToken) {
  console.error('❌ ERROR: Missing required credentials\n')
  console.log('Usage:')
  console.log('  node full-deploy.js <render-api-key> <vercel-token>\n')
  console.log('Get credentials:')
  console.log('  • Render API Key: https://dashboard.render.com/account/api-tokens')
  console.log('  • Vercel Token: https://vercel.com/account/tokens\n')
  process.exit(1)
}

let renderUrl = null

async function checkDeployedConfig() {
  const configPath = path.join(__dirname, 'render-deployed.json')
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    return config.renderUrl
  }
  return null
}

async function runScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath, ...args], {
      stdio: 'inherit',
      cwd: __dirname
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Script exited with code ${code}`))
      }
    })
  })
}

async function getDeployedUrl() {
  const configPath = path.join(__dirname, 'render-deployed.json')
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    return config.renderUrl
  }
  return null
}

async function runFullDeployment() {
  try {
    console.log('╔' + '═'.repeat(73) + '╗')
    console.log('║ PHASE 1: Deploy Backend to Render ' + '█'.repeat(31) + ' ⏳' + ' '.repeat(5) + '║')
    console.log('╚' + '═'.repeat(73) + '╝\n')

    await runScript(path.join(__dirname, 'deploy-render.js'), [renderKey])

    // Get the deployed URL
    renderUrl = await getDeployedUrl()

    if (!renderUrl) {
      throw new Error('Failed to get Render URL')
    }

    console.log('\n╔' + '═'.repeat(73) + '╗')
    console.log('║ PHASE 2: Update Frontend Configuration ' + '█'.repeat(25) + ' ⏳' + ' '.repeat(4) + '║')
    console.log('╚' + '═'.repeat(73) + '╝\n')

    await runScript(path.join(__dirname, 'update-frontend.js'), [renderUrl])

    console.log('\n╔' + '═'.repeat(73) + '╗')
    console.log('║ PHASE 3: Commit & Push Changes ' + '█'.repeat(33) + ' ⏳' + ' '.repeat(4) + '║')
    console.log('╚' + '═'.repeat(73) + '╝\n')

    console.log('📝 Committing changes to GitHub...\n')

    // Git operations
    await new Promise((resolve, reject) => {
      const gitAdd = spawn('git', ['add', 'frontend/src/config/api.js'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
      })
      gitAdd.on('close', (code) => code === 0 ? resolve() : reject())
    })

    await new Promise((resolve, reject) => {
      const gitCommit = spawn('git', ['commit', '-m', 'Update backend URL to Render'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
      })
      gitCommit.on('close', (code) => code === 0 ? resolve() : reject())
    })

    const gitPush = spawn('git', [
      'push',
      'https://rasesh13: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@github.com/rasesh13/My-protfolio-website.git',
      'main'
    ], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    })

    await new Promise((resolve, reject) => {
      gitPush.on('close', (code) => code === 0 ? resolve() : reject())
    })

    console.log('\n✅ Changes pushed to GitHub\n')

    console.log('╔' + '═'.repeat(73) + '╗')
    console.log('║ PHASE 4: Redeploy Frontend on Vercel ' + '█'.repeat(26) + ' ⏳' + ' '.repeat(4) + '║')
    console.log('╚' + '═'.repeat(73) + '╝\n')

    await runScript(path.join(__dirname, 'vercel-redeploy.js'), [vercelToken])

    console.log('\n╔' + '═'.repeat(73) + '╗')
    console.log('║ PHASE 5: Final Steps ' + '█'.repeat(44) + ' 📝' + ' '.repeat(4) + '║')
    console.log('╚' + '═'.repeat(73) + '╝\n')

    console.log('✅ ALL AUTOMATED STEPS COMPLETE!\n')

    console.log('📋 Remaining Manual Step (1 minute):\n')
    console.log('   Delete old Vercel backend:\n')
    console.log('   1. Visit: https://vercel.com/dashboard')
    console.log('   2. Find and click: "backend" project')
    console.log('   3. Go to: Settings → Danger Zone')
    console.log('   4. Click: "Delete Project"')
    console.log('   5. Confirm deletion\n')

    console.log('=' .repeat(75))
    console.log('\n🎉 MIGRATION COMPLETE!\n')

    console.log('Your Portfolio Status:')
    console.log(`  ✅ Frontend: Vercel (https://frontend-three-orcin-18.vercel.app)`)
    console.log(`  ✅ Backend: Render (${renderUrl})`)
    console.log('  ✅ Database: MongoDB Atlas')
    console.log('  ✅ Email: Gmail SMTP\n')

    console.log('🎯 Benefits:')
    console.log('  • Backend runs 24/7 (no cold-starts)')
    console.log('  • Contact form responds instantly')
    console.log('  • Emails send reliably')
    console.log('  • Portfolio works regardless of laptop state\n')

    console.log('🧪 Test Your Portfolio:')
    console.log('  1. Visit: https://frontend-three-orcin-18.vercel.app')
    console.log('  2. Fill contact form')
    console.log('  3. Check email for confirmation\n')

    console.log('=' .repeat(75) + '\n')

  } catch (error) {
    console.error('\n❌ Deployment Error!\n')
    console.error('Error:', error.message)
    console.log('\n📍 Troubleshooting:')
    console.log('   • Verify API keys are valid')
    console.log('   • Check internet connection')
    console.log('   • Try individual scripts if needed:')
    console.log('     - node deploy-render.js <key>')
    console.log('     - node update-frontend.js <url>')
    console.log('     - node vercel-redeploy.js <token>')
    console.log()
    process.exit(1)
  }
}

// Start deployment
runFullDeployment()
