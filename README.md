# MERN Bug Tracker 🐞

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

A full-stack bug tracking application built with **MongoDB**, **Express**, **React**, and **Node.js**, featuring robust error handling, testing, and developer-friendly debugging tools.

---

## ✨ Features

- 🐛 Full CRUD operations for managing bugs  
- ⚠️ Advanced error handling with custom error classes  
- 🧾 Validation for all form inputs  
- 🚨 Centralized error logging and formatted API error responses  
- 🔐 JWT Authentication support *(optional)*  
- 🧪 Comprehensive test suite using Jest, Supertest, and Cypress  
- 🎯 Real-time form validations and intuitive UI  
---

🚀 Quick Start
# Clone repository
git clone https://github.com/yourusername/mern-bug-tracker.git
cd mern-bug-tracker

# Install dependencies
npm run install-all

# Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development servers
npm start
---

## 🛠️ Tech Stack

| Component     | Technology                   |
|--------------|------------------------------|
| Frontend     | React 18, Context API        |
| Backend      | Express.js                   |
| Database     | MongoDB, Mongoose            |
| API Client   | Axios                        |
| Testing      | Jest, Supertest, Cypress     |
| Auth (opt)   | JSON Web Tokens (JWT)        |

---

## 📁 Project Structure

```
mern-bug-tracker/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── tests/ # Unit & Integration Tests
│ │ └── App.jsx
│ └── cypress/ # E2E tests
├── server/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── middleware/
│ └── tests/ # Backend unit/integration
├── .env.example
├── README.md
└── package.json
```

---

## 🔧 Error Handling Architecture

### Backend Structure

```
server/
├── middleware/
│ └── errorHandler.js # Centralized error processor
├── utils/
│ └── APIError.js # Custom error class
├── controllers/
│ └── bugController.js # Business logic
└── routes/
└── bugRoutes.js # API endpoints
```
🔧 Error Handling System
Backend Error Flow

```
sequenceDiagram
    Frontend->>Backend: API Request
    Backend->>Controller: Process request
    Controller->>ErrorHandler: Throw error
    ErrorHandler->>Frontend: Structured response
```

### Error Response Format
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required",
    "status": "Invalid status value"
  },
  "stack": "Error stack trace (only in development)"
}
```
🚀 Getting Started
✅ Prerequisites
Node.js v16+

MongoDB Atlas or local instance

Git

🔧 Installation

```
# Clone the repo
git clone https://github.com/yourusername/mern-bug-tracker.git
cd mern-bug-tracker

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

⚙️ Environment Setup

```
# server/.env
MONGODB_URI=mongodb://localhost:27017/bugtracker
PORT=5000
JWT_SECRET=your_jwt_secret  # optional

# client/.env
REACT_APP_API_URL=http://localhost:5000

```

🖥️ Running the App
Development 

```
# From root directory
npm run dev

```
Frontend: http://localhost:3000
Backend: http://localhost:5000

Production
```
cd client && npm run build
cd ../server && npm start

```

🧪 Testing

```
# All tests
npm test

# Server unit tests
npm run test:unit

# Integration tests (Supertest)
npm run test:integration

# E2E tests (Cypress)
npm run test:e2e
```

🧪 Testing Strategy
Type	Description
Unit Tests	UI components, utility functions
Integration	API routes + form-to-API workflows
E2E	Cypress bug creation, deletion flows

🛠️ Debugging Tools
console.log() and conditional logs

Chrome DevTools for UI and network inspection

Node.js --inspect for backend tracing

React Error Boundaries

Express error middleware logs

🧪 Code Coverage (Sample)

```
Statements   : 82% (Target: 70%)
Branches     : 75% (Target: 60%)
Functions    : 78% (Target: 70%)
Lines        : 80% (Target: 70%)

```
📂 Coverage reports are available in the /coverage/ folder.

