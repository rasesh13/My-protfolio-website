#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';

const VERCEL_TOKEN = 'vcp_3pHGhQPasTGBlB5gZtz8GVTK5hBuaeF8Lht5ADr57NvvSTRRQH2PoRXD';
const PROJECT_ID = 'prj_oep4micC3SYlq8ch8obGxiHziuBx';

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
  console.log('║              FRESH FRONTEND DEPLOYMENT PROCEDURE                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Get all deployments
    console.log('📋 Fetching all existing deployments...\n');
    const deploymentsResponse = await makeRequest('GET', `/v6/deployments?projectId=${PROJECT_ID}&limit=100`);
    
    if (deploymentsResponse.status !== 200) {
      throw new Error(`Failed to fetch deployments: ${deploymentsResponse.status}`);
    }

    const deployments = deploymentsResponse.data.deployments || [];
    console.log(`Found ${deployments.length} deployments\n`);

    if (deployments.length > 0) {
      console.log('🗑️  Deleting all existing deployments...\n');
      for (let i = 0; i < deployments.length; i++) {
        const deployment = deployments[i];
        const deleteResponse = await makeRequest('DELETE', `/v13/deployments/${deployment.id}`);
        
        if (deleteResponse.status === 200 || deleteResponse.status === 204) {
          console.log(`   ✅ Deleted: ${deployment.id}`);
        }
      }
      console.log('\n');
    }

    // Step 2: Verify frontend build is clean
    console.log('🔨 Building frontend locally...\n');
    try {
      const buildOutput = execSync('cd frontend && npm run build 2>&1', { 
        cwd: process.cwd().replace(/backend$/, ''),
        encoding: 'utf8' 
      });
      console.log('✅ Frontend built successfully\n');
    } catch (e) {
      console.error('❌ Build failed:', e.message);
      throw e;
    }

    // Step 3: Verify dist folder exists
    const distPath = './frontend/dist';
    if (!fs.existsSync(distPath)) {
      throw new Error('dist folder not found after build');
    }
    console.log('✅ dist folder ready\n');

    // Step 4: Force git push to trigger fresh deployment
    console.log('📤 Pushing to GitHub to trigger fresh deployment...\n');
    execSync('cd . && git add -A && git commit --allow-empty -m "Fresh deployment - clean build" && git push origin main', {
      cwd: process.cwd().replace(/backend$/, ''),
      stdio: 'pipe'
    });
    console.log('✅ Pushed to GitHub\n');

    // Step 5: Wait for Vercel to detect the push
    console.log('⏳ Waiting for Vercel to detect the new push...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 6: Monitor new deployment
    console.log('🚀 Monitoring fresh deployment...\n');
    let newDeploymentFound = false;
    let attempts = 0;
    let deployment = null;

    while (!newDeploymentFound && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;

      const checkResponse = await makeRequest('GET', `/v6/deployments?projectId=${PROJECT_ID}&limit=1`);
      if (checkResponse.status === 200 && checkResponse.data.deployments && checkResponse.data.deployments.length > 0) {
        deployment = checkResponse.data.deployments[0];
        if (deployment.id && deployment.status) {
          newDeploymentFound = true;
          console.log(`✅ New deployment detected: ${deployment.id}\n`);
        }
      }
    }

    if (!deployment) {
      throw new Error('No new deployment found after push');
    }

    // Step 7: Wait for completion
    console.log('⏳ Waiting for build to complete...\n');
    let buildComplete = false;
    let buildAttempts = 0;

    while (!buildComplete && buildAttempts < 120) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      buildAttempts++;

      const statusResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
      const dep = statusResponse.data;

      const status = dep.status;
      process.stdout.write(`\r   Elapsed: ${buildAttempts * 5}s | Status: ${status.toUpperCase()}`);

      if (status === 'ready' || status === 'error' || status === 'canceled') {
        buildComplete = true;
        console.log('\n');
      }
    }

    // Step 8: Final check
    const finalResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
    const finalDeploy = finalResponse.data;

    if (finalDeploy.status === 'ready') {
      console.log('\n╔════════════════════════════════════════════════════════════════╗');
      console.log('║                    ✅ FRESH DEPLOYMENT COMPLETE!                ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');

      console.log('📍 Your Live Portfolio:');
      console.log('   https://my-protfolio-website.vercel.app\n');

      console.log('📊 Deployment Info:');
      console.log(`   ID: ${deployment.id}`);
      console.log(`   Status: READY ✅`);
      console.log(`   URL: ${finalDeploy.url}\n`);

      console.log('🧪 Next Steps:');
      console.log('   1. Hard refresh: Ctrl+Shift+R');
      console.log('   2. View your portfolio');
      console.log('   3. Scroll down and test contact form');
      console.log('   4. Verify email submission\n');
    } else {
      console.log(`\n❌ Deployment failed with status: ${finalDeploy.status}`);
      if (finalDeploy.errorMessage) {
        console.log(`Error: ${finalDeploy.errorMessage}`);
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
