# PCSI - Philippine Coleopterist Society Inc.

A comprehensive web application for the Philippine Coleopterist Society Inc., featuring a modern React frontend with advanced UI components and a robust Node.js backend API.

The Philippine Coleopterist Society Inc. (PCSI) is an independent yet interconnected organization dedicated to the research, conservation, and popularization of tropical beetles in the Philippines.

## 🌟 Features

### Frontend
- 🎨 **Modern UI/UX** with Tailwind CSS and Radix UI components
- 📱 **Responsive Design** optimized for all devices
- 🎭 **Parallax Effects** for engaging user experience
- 📝 **Rich Text Editor** with TipTap integration
- 🔐 **Authentication System** with JWT tokens
- 🎯 **Admin Panel** for content management
- 📊 **Dynamic Content** for publications, announcements, and features
- 🚀 **Performance Optimized** with Vite and React 19

### Backend
- 🔐 **JWT Authentication** with access and refresh tokens
- 🔑 **API Key Authentication** for additional security
- 📧 **Email Verification** and password reset functionality
- 👥 **Role-based Access Control** (User/Admin)
- 🛡️ **Input Validation** and comprehensive error handling
- 📊 **MongoDB Integration** with Mongoose
- 🚀 **RESTful API** design with Express.js

## 🏗️ Project Structure

```
PCSI/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Base UI components (Radix UI)
│   │   │   ├── forms/       # Form components
│   │   │   ├── common/      # Common components
│   │   │   └── news-events/ # News and events components
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin panel pages
│   │   │   ├── news-events/ # News and events pages
│   │   │   └── ...         # Other page components
│   │   ├── services/        # API service functions
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── constants/      # Application constants
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # MongoDB models
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Express middlewares
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── index.js
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PCSI
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   **Backend Environment** (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pcsi
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   API_KEY=your_api_key
   ```

   **Frontend Environment** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=PCSI
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TipTap** - Rich text editor
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Express Validator** - Input validation

## 📋 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 🎨 Key Features

### Admin Panel
- **Content Management** for publications, announcements, and features
- **User Management** with role-based access
- **Rich Text Editor** for content creation
- **File Upload** for images and documents
- **Dashboard** with analytics and statistics

### Public Website
- **Responsive Design** for all devices
- **Parallax Scrolling** effects for enhanced UX
- **Dynamic Content** loading from CMS
- **Search and Filter** functionality
- **Contact Forms** with email integration

### Authentication
- **Secure Login/Logout** with JWT tokens
- **Email Verification** for new accounts
- **Password Reset** functionality
- **Role-based Access** (User/Admin)
- **Session Management** with refresh tokens

## 🔧 Configuration

### Database
The application uses MongoDB for data storage. Make sure MongoDB is running locally or provide a cloud MongoDB connection string in the environment variables.

### Email Service
Configure email settings in the backend environment variables for:
- User registration verification
- Password reset emails
- Contact form notifications

### API Keys
Set up API keys for additional security layers and external service integrations.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your server or cloud platform
```

### Environment Variables
Make sure to set up production environment variables for both frontend and backend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the respective frontend and backend README files

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **React Team** for the amazing framework
- **MongoDB** for the flexible database solution

---


