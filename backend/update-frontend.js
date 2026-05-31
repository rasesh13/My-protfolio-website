#!/usr/bin/env node

/**
 * AUTOMATED FRONTEND UPDATE SCRIPT
 * Updates frontend to use new Render backend URL
 * 
 * Usage: node update-frontend.js <render-url>
 * Example: node update-frontend.js https://portfolio-backend-xxxx.onrender.com
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get Render URL from command line
const renderUrl = process.argv[2]

if (!renderUrl) {
  console.error('\n❌ ERROR: Please provide your Render URL\n')
  console.log('Usage: node update-frontend.js <render-url>')
  console.log('Example: node update-frontend.js https://portfolio-backend-xxxx.onrender.com\n')
  process.exit(1)
}

// Validate URL
if (!renderUrl.startsWith('https://')) {
  console.error('\n❌ ERROR: URL must start with https://\n')
  process.exit(1)
}

console.log('\n' + '='.repeat(60))
console.log('🔄 UPDATING FRONTEND CONFIGURATION')
console.log('='.repeat(60) + '\n')

// Path to frontend API config
const apiConfigPath = path.join(
  __dirname,
  '..',
  'frontend',
  'src',
  'config',
  'api.js'
)

// Read current config
let apiConfig = fs.readFileSync(apiConfigPath, 'utf-8')

// Show current backend
console.log('📍 Current configuration:')
const currentMatch = apiConfig.match(/const API_BASE_URL = ['"](.+?)['"]/);
const currentUrl = currentMatch ? currentMatch[1] : 'Not found'
console.log(`   Backend: ${currentUrl}\n`)

// Update with new URL
const newConfig = apiConfig.replace(
  /const API_BASE_URL = ['"](.+?)['"]/,
  `const API_BASE_URL = '${renderUrl}'`
)

// Write updated config
fs.writeFileSync(apiConfigPath, newConfig)

console.log('✅ Updated configuration:')
console.log(`   Backend: ${renderUrl}\n`)

console.log('📝 Changes made:')
console.log(`   File: frontend/src/config/api.js`)
console.log(`   Updated: API_BASE_URL\n`)

console.log('='.repeat(60))
console.log('🚀 NEXT STEPS')
console.log('='.repeat(60))
console.log(`
1. ✅ Frontend config updated to use: ${renderUrl}
2. 👉 Commit the changes:
   cd ..
   git add frontend/src/config/api.js
   git commit -m "Update backend URL to Render"
   
3. 👉 Push to GitHub:
   git push origin main
   
4. 👉 Redeploy frontend on Vercel:
   - Visit: https://vercel.com/dashboard
   - Click "portfolio" frontend
   - Click "Redeploy" button
   - Wait for deployment to complete

5. 👉 Delete old Vercel backend:
   - Visit: https://vercel.com/dashboard
   - Click "backend" project
   - Settings → Danger Zone → Delete Project
   - Click "Delete"

6. ✅ Done! Your portfolio now uses Render backend 🎉
`)
console.log('='.repeat(60) + '\n')
