# Event Registration System - Deployment Guide

## 🔧 Fixed Issues

### 1. Authentication Issue (FIXED)
The main issue was in `server/routes/auth.js` - the student login route was incorrectly checking for admin credentials instead of student credentials. This has been fixed.

### 2. CORS Configuration (FIXED)
Updated CORS settings to allow cross-origin requests from your Vercel frontend.

## 📋 Deployment Steps

### Backend (Render)

1. **Set Environment Variables in Render:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/event-registration?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-admin-password
   ```

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Use the following settings:
     - Build Command: `npm install`
     - Start Command: `node server.js`
     - Port: `5000` (or let Render assign one)

3. **Create Admin User:**
   After deployment, run the admin creation script:
   ```bash
   npm run seed:admin
   ```

### Frontend (Vercel)

1. **Set Environment Variables in Vercel:**
   ```
   REACT_APP_API_URL=https://event-registration-system-2167.onrender.com/api
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Use default settings for React app

### Database (MongoDB Atlas)

1. **Create Cluster and Database:**
   - Create a new cluster in MongoDB Atlas
   - Create a database named `event-registration`
   - Create collections: `users`, `admins`, `events`, `registrations`

2. **Set Up Database User:**
   - Create a database user with read/write permissions
   - Whitelist IP addresses (0.0.0.0/0 for Render)

## 🔍 Testing the Deployment

### Test Student Login:
1. Register a new student account through the frontend
2. Login with the registered credentials

### Test Admin Login:
1. Use the admin credentials you set in the environment variables
2. Default: `admin@example.com` / `your-admin-password`

## 🚨 Common Issues & Solutions

### "Invalid Credentials" Error
- **Student Login**: Make sure the user exists in the `users` collection
- **Admin Login**: Make sure the admin exists in the `admins` collection

### "Data hash password required" Error
- This was the main issue - now fixed in the authentication routes

### CORS Issues
- The CORS configuration has been updated to allow your Vercel domain

### Database Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes Render's IP
- Check that your connection string is correct

## 🔧 Environment Variables Summary

### Server (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/event-registration?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password
```

### Client (.env)
```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

## 📝 Notes

- The authentication system now properly separates student and admin login flows
- Passwords are properly hashed for students using bcrypt
- Admin passwords are stored in plain text (as per your original design)
- CORS is configured to allow requests from your Vercel frontend

## 🔗 Current Deployments
- Frontend: https://event-registration-system-nu.vercel.app/
- Backend: https://event-registration-system-2167.onrender.com/

After making these changes, redeploy both your frontend and backend, and the login issues should be resolved.