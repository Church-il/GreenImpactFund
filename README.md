# 🌿 Mazingira - Green Impact Fund Frontend

[![Figma Design](https://img.shields.io/badge/Figma-Design%20System-2e7d32?style=for-the-badge&logo=figma)](https://www.figma.com/design/coFE85JgKpihGbS2LP5i6j/Green-Impact-Fund?node-id=1-7&t=EIWTxsbao7VJRVv3-1)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-GreenImpactFund-2e7d32?style=for-the-badge)](https://greenimpactfund.netlify.app/)
[![Presentation Slides](https://img.shields.io/badge/📊_Presentation-Slides-2e7d32?style=for-the-badge)](https://1drv.ms/b/c/0218897d71a98f7a/EWeTl_ALf3BEkcJGg_COxFcBSf1NJUbBxkQtGZ1RV-Po2Q)

![Project Banner](https://via.placeholder.com/1500x400.png?text=Green+Impact+Fund+🌿+Empowering+Sustainable+Change)

## 📚 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Design Resources](#-design-resources)
4. [Tech Stack](#-tech-stack)
5. [Live Demo](#-live-demo)
6. [Getting Started](#-getting-started)
7. [Project Structure](#-project-structure)
8. [API Integration](#-api-integration)
9. [Deployment](#-deployment)
10. [Contributing](#-contributing)
11. [License](#-license)
12. [Contact](#-contact)

---

## 🎯 Project Overview
**Climate Action Through Technology**  
Mazingira Frontend is a React-based platform connecting donors with environmental projects across Africa. It provides a seamless donation experience with interactive storytelling and real-time project tracking.

### 🔥 Why Mazingira?
- **Eco-Friendly Donations** - Every donation contributes to real-world climate action.
- **Transparency & Trust** - Live tracking of donations and their impact.
- **Innovative UI/UX** - Beautiful, engaging design optimized for accessibility.

---

## ✨ Key Features

| Category        | Highlights                                                                 |
|-----------------|----------------------------------------------------------------------------|
| **User Interface** | 🎨 Figma-designed components • 📱 Mobile-responsive layout • 🖼️ Lazy-loaded images |
| **Security**    | 🔐 JWT Authentication • 🔄 Token Refresh • 🛡️ Protected Routes             |
| **Performance** | ⚡ 95+ Lighthouse Score • 📦 Code Splitting • 🗃️ Efficient state management |
| **Impact**      | 📊 Interactive dashboards • 🌳 Carbon offset calculator • 📈 Progress tracking |

### 🖥️ Enhanced UI Example - Styled Components
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #1b5e20;
  }
`;

export default function DonateButton() {
  return <Button>Donate Now</Button>;
}
```

---

## 🎨 Design Resources

### Figma Design System
[![Figma Preview](https://via.placeholder.com/800x400.png?text=Figma+Design+System)](https://www.figma.com/design/coFE85JgKpihGbS2LP5i6j/Green-Impact-Fund?node-id=1-7&t=EIWTxsbao7VJRVv3-1)

**Design Principles:**
- **Color Palette:** `#2e7d32` (Primary Green), `#ffcc80` (Accent Orange)
- **Typography:** Inter & Merriweather
- **UI Patterns:** Card-based layout, Animated transitions
- **Accessibility:** WCAG 2.1 AA compliant

---

## 🛠 Tech Stack

**Core Technologies**  
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)  
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.5-764ABC?logo=redux)  
![React Router](https://img.shields.io/badge/React_Router-6.14.2-CA4245?logo=react-router)

**Styling**  
![Styled Components](https://img.shields.io/badge/Styled_Components-6.0.8-DB7093?logo=styled-components)

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js ≥18.x**
- **npm ≥9.x**
- **Git ≥2.35.x**

### Installation
```bash
# Clone repository
git clone https://github.com/your-repo/mazingira-frontend.git

# Navigate to project directory
cd mazingira-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Configuration
Create a `.env` file:
```ini
REACT_APP_ENV=development
REACT_APP_API_URL_PROD=https://greenimpactfund.onrender.com
REACT_APP_API_URL_DEV=http://localhost:5000
```

---

## 🔗 API Integration

### Authentication Flow Example
```javascript
// services/authService.js
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### Protected Routes Example
```javascript
// utils/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};
```

---

## 🚀 Deployment

### Netlify Deployment
- **Connect GitHub repository**
- **Set build command:** `npm run build`
- **Set publish directory:** `build`
- **Add environment variables**

### Docker Deployment
```bash
# Build Docker image
docker build -t greenimpactfund .

# Run container
docker run -p 3000:3000 --env-file .env greenimpactfund
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
```bash
git checkout -b feat/amazing-feature
```
3. **Commit changes:**
```bash
git commit -m "feat: add new donation component"
```
4. **Push to branch:**
```bash
git push origin feat/amazing-feature
```
5. **Open a Pull Request**

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📬 Contact
Green Impact Fund Team  
📧 support@greenimpactfund.org  
🌐 [Contact Us](https://greenimpactfund.netlify.app/contact)
