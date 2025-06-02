# 🐾 StreetCats

> **Segnala, mappa e discuti gli avvistamenti di gatti randagi in città.**  
> Full-stack SPA — Angular 17 · Node/Express 20 · SQLite/Sequelize · Leaflet

---

## Funzionalità

| Modulo | Cosa puoi fare |
|--------|----------------|
| **Mappa interattiva** | Marker a zampetta, popup con foto/descrizione, zoom/drag tramite Leaflet. |
| **CRUD avvistamenti** | Aggiungi/modifica/elimina gatti con foto, markdown e posizione. |
| **Commenti** | Thread sotto ogni gatto. |
| **Auth & ACL** | Registrazione/Login (JWT + bcrypt), guard route; solo l'utente loggato può eseguire edit/delete. |
| **Responsive & dark-mode** | UI SCSS. |
| **Test** | Playwright E2E (10 scenari). |

---

## Tech stack

| Layer | Lib / Tool | Motivo |
|-------|------------|--------|
| Front-end | Angular 17 (stand-alone) · Reactive Forms · RxJS · Leaflet | Produttività, typed API, mappe leggere |
| Back-end | Node 20 · Express 5 · Multer | Middleware pattern, upload file |
| ORM | Sequelize 6 (SQLite dialect) | Zero-setup in dev, portabile a Postgres/MySQL |
| Auth | JWT (1 h) · bcrypt 12 rounds | Stateless, sicuro |
| Dev & CI | ESLint · Prettier · Husky · Playwright · Jest | Qualità e test out-of-the-box |

---

## Avvio rapido

```sh
git clone https://github.com/<tuo-utente>/streetcats.git
cd streetcats
```
# 1. backend
```sh
cd backend
npm install
npm run dev               # nodemon + auto-sync Sequelize
```
# 2. frontend (nuovo terminale)
```sh
cd ../frontend
npm install
npm run dev               # http://localhost:4200
```
