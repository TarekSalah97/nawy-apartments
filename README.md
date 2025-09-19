# Nawy Apartments — Backend API

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

Base URL: http://localhost:<API_PORT>/api/v1

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
