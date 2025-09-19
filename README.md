# Backend
# 🔐 NestJS Auth API

This is a production-ready authentication API built using [NestJS] and [MongoDB]


## 📦 Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT, Passport
- **Validation**: class-validator
- **Docs**: Swagger (OpenAPI)
- **Logger**: Winston

---

## 🛠 Setup Instructions


- Clone the Repo
- Install dependencies

```bash
cd backend
```
- Create a .env file
```bash
MONGO_URI=mongodb://localhost:27017/fullstack_test
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=3600s
```

## Run the app
```bash
npm run start:dev
```
## 🧪 API Endpoints (Swagger Documentation)
- Visit: http://localhost:3000/api

# Frontend
# 🧑‍💻 React Auth Frontend

This is a minimal authentication frontend built with **React**, integrated with a NestJS backend.

---

## ⚙️ Tech Stack

- **Framework**: React + TypeScript
- **UI**: Material UI (v5)
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Routing**: React Router
- **API Calls**: Axios
- **Loading State**: MUI LoadingButton

---

## 🛠 Setup Instructions

- Clone the Repo
- Install dependencies

```bash
cd frontend
```

- Create a .env file

```bash
BASE_URL = "http://localhost:3000"
```

## Run the app

```bash
npm start
```
