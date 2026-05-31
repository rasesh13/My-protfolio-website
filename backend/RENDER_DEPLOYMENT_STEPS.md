# RENDER DEPLOYMENT GUIDE

Your configuration is ready! Follow these steps to deploy:

## Step 1: Visit Render Dashboard
Go to: https://render.com/dashboard

## Step 2: Sign Up / Sign In
- Sign up with GitHub (recommended)
- Authorize Render to access your GitHub

## Step 3: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" → Select your GitHub
4. Find "My-protfolio-website" repository
5. Click "Connect"

## Step 4: Configure Service
- Name: portfolio-backend
- Branch: main
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
- Environment: Node
- Plan: free
- Region: oregon

## Step 5: Environment Variables
Click "Advanced" then add these variables:

Key: NODE_ENV
Value: production

Key: PORT
Value: 5000

Key: MONGODB_URI
Value: mongodb+srv://raseshvarshney82_db_user:Yuga8ajJwiF9NTul@cluster0.3oo80at.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

Key: EMAIL_USER
Value: raseshvarshney82@gmail.com

Key: EMAIL_PASSWORD
Value: nluiozutoqqaqmcq

## Step 6: Deploy
Click "Create Web Service"

Wait 2-3 minutes for deployment to complete...

## Step 7: Get Your URL
After deployment completes, you'll see your URL at the top:
https://portfolio-backend-xxxx.onrender.com

## Step 8: Update Frontend
Send the Render URL to your developer to update the frontend configuration.

---

## What Happens Next
1. Backend runs 24/7 on Render (always on, never sleeps)
2. Frontend automatically connects to new backend
3. Old Vercel backend is deleted
4. Everything works continuously!

## Testing
Once deployed, test it:
curl https://portfolio-backend-xxxx.onrender.com/health

Should return:
{
  "status": "Server is running!",
  ...
}

---

⏱️ Estimated Time: 5 minutes for setup + 2-3 minutes for deployment = ~8 minutes total
