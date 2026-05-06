# 🏥 MediCare — Doctor Appointment Booking System

A full-stack doctor appointment booking system with three user roles — Admin, Doctor, and Patient — built using the MERN stack.

## 🔗 Live Demo

- **Frontend:** https://doctor-frontend-ebon.vercel.app
- **Backend:** https://doctor-backend-ad66.onrender.com

## 📁 GitHub Repositories

- **Frontend:** https://github.com/Mr-StrangerCoder/doctor_frontend
- **Backend:** https://github.com/Mr-StrangerCoder/doctor_backend

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) + Bootstrap |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend) + Render (Backend) |

## ✨ Features

- 🔐 **JWT Authentication** — Secure login for all roles
- 👨‍⚕️ **Doctor Role** — Manage appointments, view patients
- 🧑‍💼 **Admin Role** — Manage doctors, users, and appointments
- 🙋 **Patient Role** — Book, view, and cancel appointments
- 🎨 **Bootstrap UI** — Clean teal gradient design
- 📱 **Responsive** — Works on all screen sizes

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| Admin | Manage doctors, users, all appointments |
| Doctor | View & manage own appointments |
| Patient | Book appointments, view history |

## 📂 Project Structure

```
doctor_backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js

doctor_frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── api/
```

## ⚙️ Local Setup

### Backend
```bash
git clone https://github.com/Mr-StrangerCoder/doctor_backend.git
cd doctor_backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### Frontend
```bash
git clone https://github.com/Mr-StrangerCoder/doctor_frontend.git
cd doctor_frontend
npm install
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/doctors` | Get all doctors | ✅ |
| POST | `/api/appointments` | Book appointment | ✅ |
| GET | `/api/appointments` | Get appointments | ✅ |
| PUT | `/api/appointments/:id` | Update appointment | ✅ |
| DELETE | `/api/appointments/:id` | Cancel appointment | ✅ |

## 👨‍💻 Developer

**Aadesh Sonawane**
- 📧 aadeshsonawane307@gmail.com
- 🌐 https://aadeshsonawane.netlify.app
- 💻 https://github.com/Mr-StrangerCoder
