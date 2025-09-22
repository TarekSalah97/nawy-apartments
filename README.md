# Nawy Apartments — Listings App

A simple **list of apartments** with two parts:
- **Backend** (Node/Express + MongoDB)
- **Frontend** (Next.js + MUI)

Run everything with **one command** using Docker Compose.



### 🚀 Quick Start (Docker)

**Prerequisites:** Docker Desktop

```bash
git clone https://github.com/TarekSalah97/nawy-apartments.git
cd nawy-apartments
docker compose up --build
```
- First run may take a while (image pulls + dependency install). Subsequent runs are much faster.

> ℹ️ **Dev mode:** The included Docker Compose starts both services in **development mode**
> (`next dev` and `tsx watch`). Dev mode provides hot reload and better DX, but it’s **slower
> and heavier** than a production build. That’s expected on first run.

#### Please wait until both services are fully started:

- Backend API will be ready at: http://localhost:4000
- Frontend will be ready at: http://localhost:3000 (this may take extra time to build)

#### You'll know the frontend is ready when you see:

- "frontend  |  ✓ Ready in Xs" message in the Docker logs
- The frontend URL becomes accessible in your browser
- The frontend depends on the backend API, so it may take a few moments after the backend is running.

## 🔗 Important Links
- API base: http://localhost:4000
- API documentation: http://localhost:4000/api/docs
- Frontend: http://localhost:3000


## 📁 Project Structure
- backend/           # Express API, MongoDB models, Swagger docs
- frontend/          # Next.js app (App Router), MUI UI
- docker-compose.yml

## Nawy Apartments — Backend API

A simple REST API for listing, creating, and fetching apartment details.  
Built with **Node.js + TypeScript + Express + Mongoose**, validated with **Zod**.

## Features

- CRUD (list, details, create) for apartments
- Search & filters: `searchQuery`, `project`, `minPrice`, `maxPrice`, `bedrooms`, `sortBy`
- Pagination (`page`, `perPage`)
- Zod request validation
- MongoDB indices + text search
- Seed script for amenities, developers, and 20 sample apartments

## Quickstart

### Prerequisites

- Node.js 20+
- MongoDB running locally (or via Docker: `docker run -d --name nawy_mongo -p 27017:27017 mongo:7`)

### Environment

Create `.env` in `backend/`:

```env
API_PORT=4000
MONGODB_URI=mongodb://localhost:27017/nawy_apartments
CORS_ORIGIN=http://localhost:3000
```

### Install & run

```bash
cd backend
npm install
cp .env.example .env   # if present; otherwise create .env with values below
npm run dev
```

### Endpoints

Base URL: http://localhost:4000/api/v1

### API Documentation

Live API documentation is available at /api/docs when the server is running:

```bash
http://localhost:4000/api/docs
```

#### GET /apartments

List apartments with optional search, filters, sorting, and pagination.

Query params (all optional):

- searchQuery — free text across unitName, unitNumber, projectName
- project — exact project name (case-insensitive)
- minPrice, maxPrice — numbers
- bedrooms — integer
- page — default 1
- perPage — default 12 (max 100)
- sortBy — e.g. MIN_PRICE, MAX_PRICE, NEWEST

##### Response

```json
{
  "data": [
    /* apartments */
  ],
  "pageInfo": { "page": 1, "perPage": 12, "total": 123, "totalPages": 11 }
}
```

#### GET /apartments/:id

Fetch one apartment by Mongo ObjectId.

#### POST /apartments

Fetch one apartment by Mongo ObjectId.

## Nawy Apartments — Frontend (Next.js)

The UI is built with Next.js (App Router) and MUI.

### Run Frontend Without Docker (Dev)

Frontend runs at http://localhost:3000
``` bash
cd frontend
npm install
npm run dev
```

### Environment (frontend/.env.local):
```bash
# Used by client-side fetches
NEXT_PUBLIC_API_URL=http://localhost:4000

# (Optional) Used by server-side fetches inside Next.js (App Router)
INTERNAL_API_URL=http://localhost:4000
```

### Notes

- The frontend fetches the backend API at NEXT_PUBLIC_API_URL for client-side code.

- For server components/route handlers you can use INTERNAL_API_URL (or fall back to NEXT_PUBLIC_API_URL).

### Production Build (optional)
```bash
cd frontend
npm run build
npm run start  # serves the optimized production build
```