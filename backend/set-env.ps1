# Script to set EMAIL_PASSWORD in Vercel
Write-Host "Setting EMAIL_PASSWORD to Vercel backend project..." -ForegroundColor Cyan
$emailPassword = 'vvbazxvsnkzhacnh'

# Try using vercel with automation
$env:VERCEL_ORG_ID = (vercel list 2>&1 | Select-String 'backend' | ConvertFrom-Json | Select-Object -First 1).orgId

# Attempt to set via Vercel CLI
Write-Host "`nAttempting to set EMAIL_PASSWORD..." -ForegroundColor Yellow

# Use the Vercel dashboard URL
$projectUrl = "https://vercel.com/rasesh13s-projects/backend/settings/environment-variables"
Write-Host "`n📋 Vercel Dashboard URL: $projectUrl" -ForegroundColor Cyan
Write-Host "Please manually add EMAIL_PASSWORD=$emailPassword in the Production environment" -ForegroundColor Yellow
Write-Host "`nOr deploy - still trying CLI..." -ForegroundColor Gray

# Try one more approach with the password
Write-Host "`nPassword ready: $emailPassword" -ForegroundColor Green
