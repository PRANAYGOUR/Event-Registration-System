# 🚀 EventHub Deployment Guide

A comprehensive guide for deploying the Event Registration System to production using modern cloud platforms.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Configuration](#database-configuration)
- [Testing & Verification](#testing--verification)
- [Troubleshooting](#troubleshooting)
- [Security Best Practices](#security-best-practices)
- [Monitoring & Maintenance](#monitoring--maintenance)

## 🔧 Prerequisites

Before starting deployment, ensure you have:

- ✅ GitHub account with repository access
- ✅ MongoDB Atlas account (free tier available)
- ✅ Cloud platform accounts (Render, Vercel, or alternatives)
- ✅ Node.js and npm installed locally
- ✅ Basic understanding of environment variables
- ✅ Domain name (optional, for custom domains)

## 🌍 Environment Setup

### 1. Environment Variables Configuration

Create separate environment files for different deployment stages:

#### Development Environment (`.env.development`)
```bash
# Backend
MONGODB_URI=mongodb://localhost:27017/event-registration-dev
JWT_SECRET=your-development-secret-key
ADMIN_EMAIL=admin@localhost.local
ADMIN_PASSWORD=dev-admin-password
PORT=5000
NODE_ENV=development

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

#### Production Environment (`.env.production`)
```bash
# Backend - Replace with your actual values
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=<generate-strong-secret-key>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<secure-admin-password>
PORT=5000
NODE_ENV=production

# Frontend
REACT_APP_API_URL=<your-backend-url>/api
REACT_APP_ENVIRONMENT=production
```

### 2. Generate Secure Secrets

Create strong, unique secrets for production:

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate secure admin password
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 🖥️ Backend Deployment

### Option 1: Render (Recommended)

#### Step 1: Create Web Service
1. Login to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure build settings:

```yaml
Name: eventhub-backend
Branch: main (or your deployment branch)
Build Command: npm install
Start Command: node server.js
Environment: Node
Region: Choose closest to your users
Instance Type: Free (upgrade as needed)
```

#### Step 2: Environment Variables
Add these environment variables in Render:

```bash
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-generated-jwt-secret>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-secure-admin-password>
PORT=5000
NODE_ENV=production
```

#### Step 3: Advanced Settings
```yaml
Health Check Path: /api/health
Health Check Timeout: 30
Auto Deploy: Yes (recommended)
```

### Option 2: Alternative Platforms

#### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add --service
railway up
```

#### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Create and deploy
heroku create your-eventhub-backend
git push heroku main
heroku config:set MONGODB_URI=<your-string>
heroku config:set JWT_SECRET=<your-secret>
```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Connect Repository
1. Login to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:

```yaml
Framework: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### Step 2: Environment Variables
Add these in Vercel:

```bash
REACT_APP_API_URL=<your-backend-url>/api
REACT_APP_ENVIRONMENT=production
GENERATE_SOURCEMAP=false
```

#### Step 3: Domain Settings
- Use the provided `.vercel.app` domain
- Or add custom domain in settings
- Enable automatic HTTPS

### Option 2: Alternative Platforms

#### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

#### GitHub Pages Deployment
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/event-registration-system"

# Deploy
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🗄️ Database Configuration

### MongoDB Atlas Setup

#### Step 1: Create Cluster
1. Login to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Cluster"
3. Choose "Shared" (free tier)
4. Select cloud provider and region
5. Configure cluster settings

#### Step 2: Database Access
1. Go to "Database Access" → "Add New Database User"
2. Create user with read/write permissions
3. Use strong password or autogenerate
4. Note down username and password

#### Step 3: Network Access
1. Go to "Network Access" → "Add IP Address"
2. Add current IP address for testing
3. Add `0.0.0.0/0` for production (or specific IPs)

#### Step 4: Connection String
1. Go to "Clusters" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with actual password
5. Replace `<dbname>` with your database name

Example connection string:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/eventhub?retryWrites=true&w=majority
```

### Database Collections
The application will automatically create these collections:
- `users` - Student user accounts
- `admins` - Administrator accounts
- `events` - Event listings
- `registrations` - Event registrations

## 🧪 Testing & Verification

### Pre-Deployment Testing
```bash
# Test locally with production build
# Backend
NODE_ENV=production npm start

# Frontend
REACT_APP_API_URL=http://localhost:5000/api npm start
```

### Post-Deployment Verification

#### Backend Health Check
```bash
# Test API endpoints
curl https://your-backend-url/api/health
curl https://your-backend-url/api/events

# Test admin creation
curl -X POST https://your-backend-url/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-admin-email","password":"your-admin-password"}'
```

#### Frontend Verification
1. Visit your deployed frontend URL
2. Test student registration
3. Test student login
4. Test admin login
5. Test event creation (admin)
6. Test event registration (student)

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check MongoDB Atlas
- Verify cluster is running
- Check network IP whitelist
- Verify database user credentials
- Test connection string locally
```

#### CORS Issues
```bash
# Backend CORS configuration
# Ensure your frontend URL is whitelisted
const corsOptions = {
  origin: ['https://your-frontend-url.vercel.app'],
  credentials: true
};
```

#### Authentication Issues
```bash
# JWT Secret mismatch
# Ensure JWT_SECRET is identical in both environments
# Check token expiration settings
# Verify admin credentials in database
```

#### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build

# Check for environment variable issues
# Ensure all required variables are set
```

### Debug Mode
Enable detailed logging:
```bash
# Backend
DEBUG=express:* NODE_ENV=development npm start

# Frontend
REACT_APP_DEBUG=true npm start
```

## 🔒 Security Best Practices

### Environment Security
- Never commit `.env` files to version control
- Use different secrets for each environment
- Rotate secrets regularly
- Use strong, unique passwords

### Database Security
- Enable MongoDB Atlas encryption at rest
- Use database user-specific permissions
- Regular backup schedules
- Monitor database access logs

### Application Security
- Implement rate limiting
- Use HTTPS everywhere
- Validate all user inputs
- Keep dependencies updated
- Regular security audits

### Deployment Security
```bash
# Add to server.js for production
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

## 📊 Monitoring & Maintenance

### Application Monitoring
- Set up uptime monitoring (e.g., UptimeRobot)
- Configure error tracking (e.g., Sentry)
- Monitor application logs
- Track performance metrics

### Database Maintenance
- Regular data backups
- Monitor database performance
- Clean up old data periodically
- Update MongoDB versions

### Update Strategy
1. Test updates in staging environment
2. Create database backups before updates
3. Deploy during low-traffic periods
4. Monitor for issues post-deployment
5. Have rollback plan ready

## 🔄 Continuous Deployment

### GitHub Actions Setup
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Render
      run: |
        curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Vercel
      run: |
        npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 📞 Support & Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

### Community Support
- Stack Overflow for technical questions
- GitHub Issues for bug reports
- Discord/Slack communities for real-time help

### Professional Support
Consider professional support for:
- Large-scale deployments
- Custom feature development
- Security audits
- Performance optimization

---

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Database cluster created and accessible
- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] Admin user created and tested
- [ ] SSL certificates configured
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Security measures implemented

**🎉 Congratulations! Your EventHub system is now deployed and ready for production use!**