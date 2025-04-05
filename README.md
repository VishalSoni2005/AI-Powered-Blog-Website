# 🧠 AI-Powered Blog Website

A modern MERN-stack-based blog platform enhanced with AI capabilities. This application enables users to create, browse, and explore trending blog posts, with smart features like Google authentication, user profile management, blog search, and more.

## 🚀 Features

- 📝 Blog creation and management
- 🔍 Advanced blog and user search
- 📊 Trending and latest blogs view
- 🔐 JWT-based authentication
- ☁️ Banner image uploads
- 🧠 **AI-powered blog suggestions** — Enter a topic and get a smart AI-generated writeup  
- 🔑 Google OAuth integration

## 📁 Project Structure

- **/routes** – All route handlers
- **/controller** – Business logic for each route
- **/middlewares** – JWT verification and other middlewares

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/signup`          | Register a new user       |
| POST   | `/signin`          | Sign in with email/pass   |
| POST   | `/google-auth`     | Authenticate via Google   |

---

### 📤 Upload

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| POST   | `/upload`    | Upload banner image       |

---

### 📝 Blog Routes

| Method | Endpoint                   | Description                            |
|--------|----------------------------|----------------------------------------|
| POST   | `/create-blog`             | Create a new blog (JWT required)       |
| GET    | `/trending-blogs`          | Get trending blog posts                |
| POST   | `/latest-blogs`            | Get latest blog posts                  |
| POST   | `/search-blogs`            | Search blogs by title or category      |
| POST   | `/search-blogs-count`      | Get count of blogs in a category       |
| POST   | `/all-latest-blogs-count`  | Get total count of latest blogs        |
| POST   | `/get-blog`                | Get full content of a blog by ID       |

---

### 👤 User Routes

| Method | Endpoint        | Description                |
|--------|-----------------|----------------------------|
| POST   | `/get-profile`  | Fetch user profile data    |
| POST   | `/search-users` | Search users by username   |

---

## 🔐 Authentication

Protected routes (like `/create-blog`) require a **JWT token** in the request header:

---

## 📦 Technologies Used

- **Frontend:** React, Context API, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth
- **AI Integration:** Gemini API

---

## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/VishalSoni2005/AI-Powered-Blog-Website.git

# Navigate to the project folder
cd AI-Powered-Blog-Website

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start the backend server
cd ../server
npm start

# In a new terminal, start the frontend dev server
cd ../client
npm run dev
