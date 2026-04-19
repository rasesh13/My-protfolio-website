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
          resolve({ status: res.statusCode, data: responseData });
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
  console.log('║            PROMOTING DEPLOYMENT TO PRODUCTION                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    // Get latest deployment
    console.log('📋 Finding latest deployment from main branch...\n');
    const deploymentsResponse = await makeRequest('GET', `/v6/deployments?projectId=${PROJECT_ID}&limit=10`);
    
    if (deploymentsResponse.status !== 200) {
      throw new Error(`Failed to fetch deployments`);
    }

    const deployments = deploymentsResponse.data.deployments || [];
    const mainDeployment = deployments.find(d => d.name === 'frontend' || d.gitSource?.ref === 'main');
    
    if (!mainDeployment) {
      throw new Error('No deployment found for main branch');
    }

    console.log(`✅ Found deployment: ${mainDeployment.id}`);
    console.log(`   URL: ${mainDeployment.url}\n`);

    // Promote to production
    console.log('🚀 Promoting to production...\n');
    const promoteResponse = await makeRequest('PATCH', `/v13/deployments/${mainDeployment.id}`, {
      target: 'production'
    });

    if (promoteResponse.status === 200 || promoteResponse.status === 204) {
      console.log('✅ Promoted to production!\n');

      console.log('╔════════════════════════════════════════════════════════════════╗');
      console.log('║                   ✅ PROMOTION COMPLETE!                      ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');

      console.log('📍 Your Production Domain:');
      console.log('   https://my-protfolio-website.vercel.app\n');

      console.log('🧪 Test Now:');
      console.log('   1. Visit: https://my-protfolio-website.vercel.app');
      console.log('   2. Hard refresh (Ctrl+Shift+R)');
      console.log('   3. Scroll and test contact form\n');
    } else {
      throw new Error(`Promotion failed: ${promoteResponse.status}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
