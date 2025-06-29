# 🛡️ Vouch Vault – Service Review Application System

**Live Site:** [https://vouch-vault-syeda-fairooz-nawal.netlify.app/](https://vouch-vault-syeda-fairooz-nawal.netlify.app/)  
**Client Repo:** [https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-fairooz-nawal](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-fairooz-nawal)  
**Server Repo:** [https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-fairooz-nawal](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-fairooz-nawal)

---

## 📌 Project Overview

**Vouch Vault** is a secure, scalable, and responsive full-stack Service Review Application. This platform empowers users to post services, leave reviews, and manage content via a modern, interactive UI. Built using **React**, **Tailwind**, **Express.js**, **MongoDB**, and **Firebase Authentication**, it showcases advanced CRUD operations, JWT-based protected routes, and smooth user experience enhancements with **Framer Motion** and **SweetAlert2**.

---

## 🧩 Key Features

### 👤 Authentication
- Firebase Authentication (Email/Password + Google login)
- JWT Token secured via `httpOnly` cookies
- Route protection with middleware
- Password validation with security rules

### 🛠️ Service Management
- Add, update, and delete services
- Only the creator can edit/delete their own services
- Modal-based form for quick updates
- Service listing with category-based filtering and search

### ⭐ Review System
- Add, update, and delete reviews
- Rating system using `react-rating`
- Review management dashboard
- Reviews show reviewer photo and name

### 🔍 Advanced Functionality
- Server-side search and category filter
- Real-time review count display
- Dynamic route-based page titles
- Responsive loading spinner during data fetch
- Protected API routes via Firebase token validation

---

## 🖥️ Pages & Layout

### 🔗 Public Routes
- Home (`/`)
  - Banner carousel (Framer Motion)
  - Featured Services (6 via MongoDB `.limit()`)
  - Meet Our Partners
  - 2 additional meaningful sections
- Services (`/allservices`)
  - List all services with search + category filter
- Login / Register
  - Email/password login + Google auth

### 🔒 Private Routes
- Add Service
- My Services
- My Reviews
- Service Details (includes review submission if logged in)

---

## 🚀 Tech Stack

### Client
- React.js
- Tailwind CSS
- DaisyUI / Framer Motion / SweetAlert2
- React Router DOM
- React Hook Form
- React Helmet Async
- Axios (with secure interceptors)

### Server
- Express.js
- MongoDB with native driver
- Firebase Admin SDK
- CORS, dotenv
- JWT Authentication via Firebase

---

## 🔒 Security & Optimization

- 🔐 Firebase and MongoDB credentials secured via `.env`
- ⚡ Axios interceptor handles token expiration and error responses
- 🔄 Fully responsive design for mobile, tablet, desktop
- ✅ Custom route guards for sensitive routes
- 🧠 Structured, meaningful commit messages (15+ client, 8+ server)

---

## 🎨 UI/UX Design

- Clean, recruiter-friendly layout
- Color contrast & spacing ensure readability
- Modern interactive animations with Framer Motion
- All routes reload without breaking (SPA compliance)

---

## 📊 CountUp Section

The homepage includes animated stats using `react-countup`:
- Total Users
- Total Reviews
- Total Services

---

## 🧪 Deployment

### ✅ Live Deployment Checklist:
- [x] Netlify for client with domain whitelisted in Firebase
- [x] Render / Vercel / Cyclic for server with working CORS
- [x] All routes functional, no CORS/404/504 errors
- [x] Reloading on any route works
- [x] Private route does not redirect to login on refresh




