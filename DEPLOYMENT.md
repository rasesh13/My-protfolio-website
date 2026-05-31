# 🌍 Deployment Guide

Complete guide to deploying your portfolio to production.

## Deployment Checklist

- [ ] Update all personal information
- [ ] Configure environment variables
- [ ] Test all features locally
- [ ] Build frontend successfully
- [ ] Verify backend endpoints
- [ ] Set up monitoring
- [ ] Configure custom domain
- [ ] Set up SSL certificate

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
cd frontend
vercel
```

**Configuration:**
- Build command: `npm run build`
- Output directory: `dist`

### Option 2: Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Set build settings:
   ```
   Build command: npm install && npm run build
   Publish directory: dist
   ```

### Option 3: GitHub Pages

```bash
cd frontend
npm run build
# Deploy dist/ folder to GitHub Pages
```

## Backend Deployment

### Option 1: Railway

1. Create Railway account
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Option 2: Render

1. Create Render account
2. New Web Service
3. Connect GitHub
4. Set build command: `npm install`
5. Set start command: `npm start`

### Option 3: Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set PORT=5000
git push heroku main
```

### Option 4: AWS EC2

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js
4. Clone repository
5. Install dependencies: `npm install`
6. Start with PM2: `pm2 start server.js`

## Environment Variables

Create `.env` file on deployment platform:

```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=production
```

## Frontend API Configuration

Update `frontend/.env` or `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.com',
      changeOrigin: true
    }
  }
}
```

## SSL Certificate

Most platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- Railway: Automatic
- Render: Automatic

## Domain Configuration

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Update DNS records
3. Point to deployment platform
4. Enable auto-renewal

## Performance Optimization

```bash
# Frontend
npm install compression
npm install helmet
```

## Monitoring

- **Uptime:** UptimeRobot
- **Analytics:** Google Analytics
- **Error Tracking:** Sentry
- **Performance:** Lighthouse

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Input validation
- [ ] Rate limiting
- [ ] Secure headers
- [ ] No sensitive data in code
- [ ] Environment variables in `.gitignore`

## Continuous Deployment (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm start
```

## Troubleshooting Deployment

### Build Fails
- Check Node version matches
- Verify all dependencies in package.json
- Run `npm install` locally first

### CORS Issues
- Update CORS configuration
- Verify correct backend URL
- Check frontend proxy settings

### Email Not Working
- Verify App Password
- Check email service is enabled
- Test with test email first

### Performance Issues
- Enable gzip compression
- Minify assets
- Use CDN for static files
- Implement caching

## Production Checklist

- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Custom domain working
- [ ] Email notifications enabled
- [ ] Error logging set up
- [ ] Analytics tracking
- [ ] Performance optimized
- [ ] Database backups (if applicable)

## Monitoring & Maintenance

- Check logs regularly
- Monitor error rates
- Update dependencies
- Backup data
- Review analytics
- Security updates

## Cost Optimization

- **Vercel:** Free tier available
- **Netlify:** Free tier available
- **Railway:** $5/month base
- **Render:** Free tier available
- **Gmail API:** Free for personal use

## Support & Help

- Platform documentation
- Community forums
- Stack Overflow
- GitHub Issues

---

**Pro Tips:**
- Start with free tier first
- Monitor costs as you scale
- Set up alerts for errors
- Automate deployments
- Keep backups
