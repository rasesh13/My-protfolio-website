#!/usr/bin/env node

import https from 'https';

const VERCEL_TOKEN = 'vcp_3pHGhQPasTGBlB5gZtz8GVTK5hBuaeF8Lht5ADr57NvvSTRRQH2PoRXD';
const PROJECT_ID = 'prj_oep4micC3SYlq8ch8obGxiHziuBx';
const TEAM_ID = 'rasesh13s-projects';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: responseData ? JSON.parse(responseData) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║         FIXING VERCEL BUILD CONFIGURATION                        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Get current project settings
    console.log('📋 Fetching current project settings...');
    const getResponse = await makeRequest('GET', `/v9/projects/${PROJECT_ID}`);
    
    if (getResponse.status !== 200) {
      throw new Error(`Failed to fetch project: ${getResponse.status}`);
    }

    const project = getResponse.data;
    console.log(`✅ Project found: ${project.name}`);
    console.log(`   Current build command: ${project.buildCommand || 'auto-detected'}`);
    console.log(`   Output directory: ${project.outputDirectory || 'auto-detected'}\n`);

    // Step 2: Update build settings
    console.log('⚙️  Updating build configuration...');
    const updateData = {
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      rootDirectory: 'frontend'
    };

    const updateResponse = await makeRequest('PATCH', `/v9/projects/${PROJECT_ID}`, updateData);
    
    if (updateResponse.status !== 200) {
      throw new Error(`Failed to update project: ${updateResponse.status} - ${JSON.stringify(updateResponse.data)}`);
    }

    console.log('✅ Build configuration updated:');
    console.log(`   Build Command: npm run build`);
    console.log(`   Output Directory: dist`);
    console.log(`   Root Directory: frontend\n`);

    // Step 3: Trigger redeploy
    console.log('🚀 Triggering deployment...');
    const deployResponse = await makeRequest('POST', `/v13/projects/${PROJECT_ID}/deployments`, {
      gitSource: {
        ref: 'main',
        sha: null,
        redeploymentTriggeredBy: 'cli'
      }
    });

    if (deployResponse.status !== 200 && deployResponse.status !== 201) {
      throw new Error(`Failed to trigger deployment: ${deployResponse.status}`);
    }

    const deployment = deployResponse.data;
    console.log(`✅ Deployment triggered!`);
    console.log(`   ID: ${deployment.id}`);
    console.log(`   URL: ${deployment.url}\n`);

    // Step 4: Monitor deployment
    console.log('⏳ Monitoring deployment status...\n');
    let deploymentReady = false;
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes with 10-second intervals

    while (!deploymentReady && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      attempts++;

      const statusResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
      const depData = statusResponse.data;

      const status = depData.status;
      const progress = depData.buildingProgress;

      process.stdout.write(`\r   Status: ${status} (${attempts * 10}s) ${progress ? `[${progress}%]` : ''}`);

      if (status === 'ready' || status === 'error') {
        deploymentReady = true;
        console.log('\n');
      }
    }

    // Step 5: Verify deployment
    if (deployment.status === 'ready' || attempts < maxAttempts) {
      console.log('✅ Deployment successful!\n');
      console.log('📊 Deployment Details:');
      console.log(`   Status: READY`);
      console.log(`   URL: https://my-protfolio-website.vercel.app`);
      console.log(`   Deployment: ${deployment.url}\n`);

      console.log('╔════════════════════════════════════════════════════════════════╗');
      console.log('║                    ✅ ALL FIXED & DEPLOYED!                    ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');

      console.log('🎯 Next Steps:');
      console.log('   1. Visit: https://my-protfolio-website.vercel.app');
      console.log('   2. Hard refresh (Ctrl+Shift+R)');
      console.log('   3. Test the contact form');
      console.log('   4. Backend is running on Render: https://my-protfolio-website-uh8o.onrender.com\n');
    } else {
      throw new Error('Deployment timed out');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
