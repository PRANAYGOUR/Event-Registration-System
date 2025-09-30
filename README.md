# 🎪 EventHub - Event Registration System

A modern, full-stack event registration platform built with React.js, Node.js, Express, and MongoDB. Features separate interfaces for students and administrators with real-time event management capabilities.

## ✨ Features

### 🎓 Student Features
- **User Authentication**: Secure login and registration system
- **Event Discovery**: Browse and search available events
- **Registration Management**: Register/unregister for events with one click
- **Personal Dashboard**: View registered events and registration history
- **Responsive Design**: Mobile-friendly interface

### 👨‍💼 Admin Features
- **Admin Authentication**: Secure admin portal access
- **Event Management**: Create, edit, and delete events
- **Registration Tracking**: Monitor student registrations per event
- **Dashboard Analytics**: Overview of system activity
- **Real-time Updates**: Live registration count and capacity tracking

### 🔧 Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Separate student and admin interfaces
- **RESTful API**: Clean API architecture
- **Database Integration**: MongoDB with Mongoose ODM
- **Modern UI**: Clean, intuitive design with animations
- **Responsive Layout**: Works on desktop, tablet, and mobile

## 🚀 Tech Stack

### Frontend
- **React.js 18** - Modern UI framework
- **React Router v6** - Client-side routing
- **CSS3** - Modern styling with CSS variables
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Deployment
- **Render** - Cloud platform for deployment
- **MongoDB Atlas** - Cloud database service
- **Docker** - Containerization support

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Event-Registration-System.git
cd Event-Registration-System
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=mongodb://localhost:27017/event-registration
JWT_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup
The system will automatically create an admin user on first run using the credentials from your `.env` file.

### 5. Run the Application

**Backend (Terminal 1):**
```bash
cd server
npm start
```

**Frontend (Terminal 2):**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🗂️ Project Structure

```
Event-Registration-System/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── AdminDashboard.js
│   │   │   ├── EventsList.js
│   │   │   ├── Login.js
│   │   │   └── ...
│   │   ├── utils/            # API utilities
│   │   ├── styles.css        # Global styles
│   │   └── App.js            # Main app component
│   └── package.json
├── server/                    # Node.js backend
│   ├── models/               # MongoDB models
│   │   ├── Admin.js
│   │   ├── Event.js
│   │   ├── Registration.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── adminAuth.js
│   │   ├── auth.js
│   │   ├── events.js
│   │   └── registrations.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js
│   │   └── authMiddleware.js
│   ├── seed/                 # Database seeding
│   │   └── createAdmin.js
│   ├── server.js             # Express server
│   └── package.json
├── docker-compose.yml        # Docker configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/student/register` - Student registration
- `POST /api/auth/admin/login` - Admin login

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Registrations
- `GET /api/registrations/student/:studentId` - Get student registrations
- `POST /api/registrations` - Register for event
- `DELETE /api/registrations/:id` - Cancel registration

## 🎨 UI Components

### Modern Design Features
- **Gradient Backgrounds**: Beautiful color gradients
- **Card-based Layout**: Clean, organized information display
- **Emoji Icons**: Fun, engaging visual elements
- **Smooth Animations**: Fade-in effects and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Loading States**: Professional loading indicators

### Color Scheme
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

## 🚀 Deployment

### Render Deployment (Recommended)
1. **Backend Deployment:**
   - Connect your GitHub repository to Render
   - Set environment variables in Render dashboard
   - Deploy with auto-build on push

2. **Frontend Deployment:**
   - Build the React app: `npm run build`
   - Deploy the build folder to Render static sites
   - Configure API URL environment variable

3. **Database:**
   - Use MongoDB Atlas for cloud database
   - Update connection string in deployment environment

### Environment Variables for Production
```env
# Server
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-registration
JWT_SECRET=your-production-secret-key
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-admin-password
PORT=5000

# Client
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Role-based Access**: Separate permissions for students and admins

## 🧪 Testing

Run the development servers and test the following:
1. Student registration and login
2. Event browsing and registration
3. Admin login and event creation
4. Registration management
5. Responsive design on mobile devices

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
2. **CORS Errors**: Check API URL configuration in client
3. **Build Issues**: Clear npm cache and reinstall dependencies
4. **Port Conflicts**: Ensure ports 3000 and 5000 are available

### Debug Mode
Set `NODE_ENV=development` in your environment for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -m 'Add feature description'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the excellent framework
- Express.js team for the robust backend framework
- MongoDB for the flexible database solution
- Render team for the seamless deployment platform



---


**⭐ Star this repository if you find it helpful!**
