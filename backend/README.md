# BACKEND SERVICES SEA CATERING

## Tentang

Bagian ini merupakan backend services untuk aplikasi SEA Catering untuk memenuhi Seleksi Software Engineering Academy.

## Stack

Node.js, Express, MongoDB, dan TypeScript. dengan global project menjadi MERN Stack (Mongo, Express, React, dan Nodejs)

## Fitur Utama

- REST API modular (/api/v1) dengan versioning
- Type-safe and easy collaboration with TypeScript
- Arsitektur proyek yang scalable & maintainable (DDD Style, modular, dan clean)
- Autentikasi aman (JWT + CSRF)
- Validasi dengan Zod
- Penanganan error terpusat & respons wrapper yang konsisten
- Logging terstruktur dengan Pino
- Middleware reusable (rate limit, admin check, dsb)
- Struktur repository pattern untuk DB access
- Environment based configuration

## Project Structure

Root '/' folder:

```
src/
  ├── api/                          // API
  ├── common/                       // Shared configs, utils, middleware
  ├── api-docs/                     // API documentation helpers
  ├── logs/                         // Runtime logs (HTTP, DB etc.), in separated file everyday
  ├── main.ts                       // Entry point
  └── server.ts                     // App + server setup
```

'Api/' folder

```
<version>/
├──<domain_features>/
    ├── controller/                   // Controlling every HTTP request and response
    ├── models/                       // Database Models (in this case using mongoose)
    ├── repo/                         // Data repository to switch between db or mock data
    ├── service/                      // Main business logic
    ├── types/                        // Typescript types
    ├── zod/                          //Input validation with zod schema
    └── <domain_features>.routes.ts   //Endpoints definition
```

'common/' folder:

```
common/
├── config/
│   ├── envConfig.ts
│   └── loggerConfig.ts
├── database/
│   └── mongoConfig.ts
├── middleware/
│   ├── errorHandlers.ts
│   ├── rateLimiter.ts
│   ├── requestLogger.ts
│   ├── requireAdmin.ts
│   ├── requireAuth.ts
│   └── requireCsrfToken.ts
├── types/
│   └── express.d.ts
└── utils/
    ├── aliasName.ts
    ├── csrfUtils.ts
    ├── httpValidate.ts
    ├── isAdminCheck.ts
    ├── responseHandler.ts
    └── serviceResponse.ts
```

## Setup Admin

Jalankan command dibawah ini setelah npm run start:dev, dan server menyala :

```bash
npm run setupAdmin
```

## Instalasi

1. Clone Repository

```bash
git clone
cd backend
```

2. Install Dependensi

```bash
npm install
```

3. Buat file .env dari .env.example berikut

```
cp .env.example .env
nano .env #or use vim
```

4. Jalankan server

```
npm run start:dev # Development mode
npm run start # Production mode
```

5. Setup admin pertama (jika belum)

```bash
npm run setupAdmin
```

# Note:

#### 1. Jika melakukan perubahan di env ketika server berjalan gunakan command berikut agar tidak perlu dimatikan

```bash
npm run refreshEnv
```
