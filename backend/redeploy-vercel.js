#!/usr/bin/env node

import https from 'https';

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
  console.log('║              REDEPLOYING FRONTEND ON VERCEL                      ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Trigger redeploy
    console.log('🚀 Triggering new deployment from main branch...\n');
    
    const deployResponse = await makeRequest('POST', `/v12/projects/${PROJECT_ID}/deployments`, {});

    if (deployResponse.status !== 200 && deployResponse.status !== 201) {
      console.log(`Status: ${deployResponse.status}`);
      console.log(`Response:`, deployResponse.data);
      throw new Error(`Failed to trigger deployment`);
    }

    const deployment = deployResponse.data;
    console.log(`✅ Deployment triggered!\n`);
    console.log(`📊 Deployment Details:`);
    console.log(`   ID: ${deployment.id}`);
    console.log(`   URL: ${deployment.url}`);
    console.log(`   Status: ${deployment.status}\n`);

    // Step 2: Monitor deployment
    console.log('⏳ Monitoring deployment status...\n');
    let isComplete = false;
    let attempts = 0;
    const maxAttempts = 60; // 10 minutes with 10-second intervals

    while (!isComplete && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      attempts++;

      const statusResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
      const depData = statusResponse.data;

      const status = depData.status;

      process.stdout.write(`\r   Elapsed: ${attempts * 10}s | Status: ${status.toUpperCase()}`);

      if (status === 'ready' || status === 'error' || status === 'canceled') {
        isComplete = true;
        console.log('\n');
      }
    }

    // Step 3: Final status
    const finalResponse = await makeRequest('GET', `/v13/deployments/${deployment.id}`);
    const finalDeploy = finalResponse.data;

    if (finalDeploy.status === 'ready') {
      console.log('✅ Deployment SUCCESSFUL!\n');
      console.log('╔════════════════════════════════════════════════════════════════╗');
      console.log('║                   🎉 FRONTEND IS LIVE! 🎉                      ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');

      console.log('📍 Your Portfolio:');
      console.log('   https://my-protfolio-website.vercel.app\n');

      console.log('📋 Final Checklist:');
      console.log('   ✅ Backend: Render (Always-on)');
      console.log('      https://my-protfolio-website-uh8o.onrender.com');
      console.log('   ✅ Frontend: Vercel (Just redeployed)');
      console.log('      https://my-protfolio-website.vercel.app\n');

      console.log('🧪 Quick Test:');
      console.log('   1. Hard refresh: Ctrl+Shift+R');
      console.log('   2. Fill contact form');
      console.log('   3. Should see "Message sent successfully!"');
      console.log('   4. Check email for confirmation\n');
    } else {
      console.log(`❌ Deployment status: ${finalDeploy.status}`);
      if (finalDeploy.errorMessage) {
        console.log(`   Error: ${finalDeploy.errorMessage}`);
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
