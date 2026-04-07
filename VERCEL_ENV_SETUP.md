# Setting Up Environment Variables on Vercel

## Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click on your **backend** project
3. Go to **Settings** → **Environment Variables**

## Step 2: Quick Method - Import Environment Variables

### Option A: Import from `.env.production` file (Easiest!)
1. Go to: https://vercel.com/rasesh13s-projects/backend/settings/environment-variables
2. Look for **"Import Environment Variables"** button
3. You can:
   - Paste raw `.env` content directly
   - Or upload the `.env.production` file from project root

Raw content to paste:
```
MONGODB_URI=your_connection_string_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password_here
NODE_ENV=production
PORT=5000
```

### Option B: Add Manually (One by one)
If you don't see import option, add these manually:

## Step 3: Add Backend Environment Variables

Add these variables:

### Required Variables:
| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` |
| `EMAIL_USER` | Your Gmail address | `your.email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password (not your regular password) | `abcd efgh ijkl mnop` |
| `NODE_ENV` | Environment type | `production` |
| `PORT` | Server port | `5000` |

## Step 4: Get MongoDB Connection String

### Option A: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string from "Connect" button
5. Replace `<password>` with your database password

Example: 
```
mongodb+srv://rasesh:mypassword@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Step 5: Get Gmail App Password

1. Enable 2-Factor Authentication on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. Copy and paste it in Vercel (without spaces)

## Step 6: Test the API

After setting environment variables, test if it works:

```bash
curl https://backend-alpha-ebon-24.vercel.app/health
```

You should see:
```json
{
  "status": "Server is running!",
  "timestamp": "2026-04-07...",
  "environment": "production"
}
```

## Troubleshooting

If contact form still fails:
1. Check backend logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Make sure MongoDB connection string is valid
4. Check email credentials are correct

