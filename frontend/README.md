# FRONTEND SEA CATERING

## Tentang

Bagian ini merupakan frontend untuk aplikasi SEA Catering. Dibuat untuk memenuhi Seleksi Software Engineering Academy. Dibangun menggunakan **React Typescript + Vite + Redux Toolkit Query** dengan arsitektur modular yang scalable.

## Stack

React, Typescript, Redux, Vite, Tailwindcss, Eslint. Dengan global project menjadi MERN Stack (Mongo, Express, React, dan Nodejs)

## Halaman

- Home (Landing page)
- Menuplan
- Testimoni
- Login
- Register
- Subscription Form

Semua telah terkoneksi ke API backend

## Fitur Utama

- Role User & Admin
- Navigasi Publik & Proteksi Halaman Admin
- Form Validasi dengan Zod
- State Management: Redux Toolkit + RTK Query
- Reusable UI Components (Card, Button, Dialog, Carousel)
- Responsive Layout
- API Modular (auth, meal plan, testimonial, subscription)

## Project Structure

```src/
├── assets/                 → Aset
├── components/             → Komponen umum (layout & UI)
├── constant/               → Konstanta global (API paths)
├── guard/                  → Route guard (Pengaman lapisan sisi client & validasi ke server)
├── hooks/                  → Custom React hooks
├── modules/                → Fitur website dipecah ke fungsi masing-masing
│   ├── auth                → Fitur autentikasi
│   ├── user                → Fitur milik user
│   └── admin               → Admin pages
├── redux/                  → Store & RTK API Query
├── utils/                  → Utility function
├── types/                  → Typescript type global
├── App.tsx                 → Root Component
├── main.tsx                → Entry Point
├── routes.ts               → Routing utama
└── index.css               → Global styles
```
