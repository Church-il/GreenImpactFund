# 🌿 Mazingira Frontend - React

![Mazingira Frontend](https://via.placeholder.com/1000x300.png?text=Mazingira+Frontend)

## 📌 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [API Integration](#api-integration)
8. [Deployment](#deployment)
9. [Contribution](#contribution)
10. [License](#license)
11. [Contact](#contact)

---

## 🌎 Overview
Mazingira Frontend is a React-based web application providing a user-friendly interface for managing donations, organizations, and stories. It integrates **Redux** for state management, **React Router** for navigation, and **Axios** for API communication.

---

## 🚀 Features
✅ **User Authentication** (JWT-based login & registration)  
✅ **Protected Routes** (Secure access to user-specific pages)  
✅ **State Management** (Redux for centralized state handling)  
✅ **Dynamic API Handling** (Auto-switching between production & development URLs)  
✅ **Token Refresh Mechanism** (Handles session expiration automatically)  
✅ **Styled Components** (Consistent and theme-based styling)  
✅ **Error Handling & Notifications** (Improved user feedback)  

---

## 🔧 Technologies Used
| Technology | Purpose |
|------------|---------|
| **React** | Frontend framework |
| **Redux** | State management |
| **React Router** | Client-side routing |
| **Axios** | API requests and token handling |
| **Styled-Components** | Component-based styling |
| **React-Toastify** | Notifications and alerts |

---

## 🛠 Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js 14+**
- **NPM or Yarn**
- **React Developer Tools (Optional, but recommended)**

### 2️⃣ Clone Repository & Install Dependencies
```sh
$ git clone https://github.com/your-repo/mazingira-frontend.git
$ cd mazingira-frontend
$ npm install  # or yarn install
```

### 3️⃣ Run the Application
```sh
$ npm start  # or yarn start
```
✅ The app will be available at `http://localhost:3000/`

---

## 🔑 Environment Variables
Create a `.env` file in the root directory:
```ini
REACT_APP_ENV=development
REACT_APP_API_URL_PROD=https://greenimpactfund.onrender.com
REACT_APP_API_URL_DEV=http://127.0.0.1:5000
```

---

## 📂 Project Structure
```
📦 mazingira-frontend
├── 📂 src
│   ├── 📂 components  # Reusable UI components
│   ├── 📂 pages       # Page-based components
│   ├── 📂 redux       # Redux store & slices
│   ├── 📂 styles      # Global styles
│   ├── 📂 utils       # Utility functions
│   ├── App.js        # Main app component
│   ├── api.js        # Axios API setup
│   ├── index.js      # React entry point
│
├── .env              # Environment variables
├── package.json      # Project dependencies
└── README.md         # Documentation
```

---

## 🔗 API Integration

The application interacts with a Flask-based backend API using **Axios**. Authentication tokens are managed via **localStorage**, and requests include JWTs for secure communication.

### Example API Call (Fetching Stories)
```js
import api from '../api';

const fetchStories = async () => {
  try {
    const response = await api.get('/stories');
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};
```

### Axios Interceptor for Authentication
```js
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

---

## 🚀 Deployment

### 🐳 Deploying with Docker
1. Build the Docker image:
   ```sh
   $ docker build -t mazingira-frontend .
   ```
2. Run the container:
   ```sh
   $ docker run -p 3000:3000 --env-file .env mazingira-frontend
   ```

### 🌍 Deploying to Vercel
1. Install Vercel CLI:
   ```sh
   $ npm install -g vercel
   ```
2. Deploy:
   ```sh
   $ vercel
   ```

---

## 🤝 Contribution
Want to contribute? Follow these steps:
1. **Fork** the repository.
2. **Create** a new branch: `git checkout -b feature-branch`.
3. **Commit** your changes: `git commit -m "Added new feature"`.
4. **Push** to the branch: `git push origin feature-branch`.
5. **Submit** a pull request.

---

## 📜 License
MIT License 📄

---

## 📞 Contact
📧 Email: `mazingira@test.com`  
🌐 Website: [mazingira.com](https://mazingira.com)

