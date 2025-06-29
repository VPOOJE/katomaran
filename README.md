# Todo List Web Application
### A full-stack Todo Task Management Web App built with React.js on the frontend and Node.js with MongoDB (via Mongoose) on the backend. This app allows users to manage daily tasks efficiently and securely using JWT-based authentication and Google OAuth login integration.

# URL
- https://katomaran-gilt.vercel.app/

#  Features
###  User Authentication

- Register/Login with email & password

- Login via Google OAuth 2.0

###  Task Management

- Add new tasks

- Edit or delete existing tasks

- Mark tasks as completed or active

- View All / Active / Completed tabs

###  Forgot Password

- Send reset email

- Update password securely

###  JWT Token Handling

- Secure APIs using Bearer tokens

- Store tokens in localStorage

# 🛠️ Tech Stack
- Frontend (React.js):

- React with React Router v6

- Axios for API communication

- Context API + Reducer for state management

- Backend (Node.js + Express):

- Express.js for REST APIs

- MongoDB with Mongoose

- bcrypt for password hashing

- JWT for token-based auth

- nodemailer for forgot-password emails

#### Authentication:

- Google OAuth 2.0 integration

- JWT stored in localStorage

#  Folder Structure (Frontend)

📦 client/
├── 📁 components/
│   ├── Header/
│   ├── Active.jsx
│   ├── Completed.jsx
│   ├── AllTask.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── forgotPassword/
│       ├── ForgotPassword.jsx
│       └── ResetPassword.jsx
├── 📁 context/
├── 📁 reducer/
├── 📁 Axios/
│   └── axios.js (Base URL setup)
├── App.js
└── index.js
## Google OAuth Integration
Configured on Google Cloud Console.

#  Setup Instructions
### Frontend
- cd client
- npm install
- npm start
### Backend
- cd server
- npm install
- npm run start
 ⚠️ Ensure MongoDB is running locally or connected via MongoDB Atlas.

“This project is a part of a hackathon run by
https://www.katomaran.com ”
