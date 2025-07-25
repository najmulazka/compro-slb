# BE Company Profile Sekolah

BE Company Profile Sekolah merupakan API Backend yang menghubungkan antara Frontend dengan database

## Instalasi

1. Install postgreSQL di sistem operasi anda
2. Deklarasikan database 
```bash
CREATE DATABASE nama_database;
```
3. ubah value dari field DATABASE_URL pada file .env
```bash
DATABASE_URL="postgresql://username:password@host:port/nama_database?schema=public"
```
4. install dependensimasuk ke directory compro-slb kemudian install
```bash
npm install
```
5. migrate database dari prisma
  
   masuk ke directory compro-slb kemudian migrate
```bash
npx prisma migrate dev --name init
```
6. Jalankan aplikasi backend pada local device
  
   masuk ke directory compro-slb kemudian jalankan aplikasi backend
```bash
npm run dev
```
