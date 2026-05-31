#!/usr/bin/env node

import https from 'https';

const VERCEL_TOKEN = 'vcp_3pHGhQPasTGBlB5gZtz8GVTK5hBuaeF8Lht5ADr57NvvSTRRQH2PoRXD';
const PROJECT_ID = 'prj_oep4micC3SYlq8ch8obGxiHziuBx';

function makeRequest(method, path) {
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
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║              🚀 MONITORING FRESH DEPLOYMENT                     ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    console.log('⏳ Waiting for new deployment...\n');
    
    let deployment = null;
    let attempts = 0;
    let foundDeployment = false;

    while (!foundDeployment && attempts < 30) {
      const response = await makeRequest('GET', `/v6/deployments?projectId=${PROJECT_ID}&limit=1`);
      
      if (response.status === 200 && response.data.deployments && response.data.deployments.length > 0) {
        deployment = response.data.deployments[0];
        if (deployment.id && deployment.status !== 'QUEUED') {
          foundDeployment = true;
        }
      }
      
      if (!foundDeployment) {
        process.stdout.write(`\r${attempts * 2}s elapsed...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }

    if (!deployment) {
      throw new Error('No deployment found');
    }

    console.log(`\n✅ Deployment found: ${deployment.id}\n`);
    console.log('📊 Build Status:\n');

    let buildComplete = false;
    let buildAttempts = 0;
    let lastStatus = '';

    while (!buildComplete && buildAttempts < 120) {
      const statusResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
      const dep = statusResponse.data;

      if (dep.status !== lastStatus) {
        console.log(`   Status: ${dep.status.toUpperCase()}`);
        lastStatus = dep.status;
      }

      if (dep.status === 'ready') {
        console.log('\n✅ Build READY!\n');
        console.log('╔════════════════════════════════════════════════════════════════╗');
        console.log('║              🎉 DEPLOYMENT SUCCESSFUL! 🎉                     ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');
        
        console.log('📍 Your Live Portfolio:');
        console.log('   https://my-protfolio-website.vercel.app\n');
        
        console.log('🧪 Quick Test:');
        console.log('   1. Hard refresh (Ctrl+Shift+R)');
        console.log('   2. Scroll down to Contact section');
        console.log('   3. Fill and submit contact form');
        console.log('   4. Check your email\n');
        
        buildComplete = true;
      } else if (dep.status === 'error' || dep.status === 'canceled') {
        console.log(`\n❌ Build ${dep.status.toUpperCase()}!`);
        if (dep.errorMessage) {
          console.log(`Error: ${dep.errorMessage}`);
        }
        buildComplete = true;
      } else {
        process.stdout.write(`\r   Building... (${buildAttempts * 3}s)`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        buildAttempts++;
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
