# Linked — Short Link + Analytics Platform

Linked is a full‑stack URL shortener with analytics. Create branded short links, apply basic targeting (country/device), and track click activity (location + device/browser) in a dashboard.

## Highlights

- **Short links**: generate and manage short URLs
- **Analytics**: clicks over time, browser & device distribution, activity log, geo visualization
- **Targeting**: optional **country** and **device/OS** based destinations
- **Auth**: JWT-based authentication + Google auth library integration (if configured)
- **More accurate tracking for email clients**: supports classifying events (click/prefetch/image proxy/bot) and deduping for *unique* clicks

## Tech stack

- **Frontend**: React (Create React App), TailwindCSS, Chart.js (`react-chartjs-2`), `globe.gl`
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Other**: JWT, `device-detector-js`, `request-ip`, `axios` (geo lookup)

## Project structure

```text
Backend/     # Express API + redirect + MongoDB models
frontend/    # React app (CRA) + analytics UI
```

## Quick start (local development)

### Prerequisites

- Node.js \(recommended: 18+\)
- MongoDB connection string

### 1) Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```bash
MONGODB_URL="mongodb://localhost:27017/linked"
JWT_SECRET="replace_me"
JWT_EXPIRES_IN="10h"
GOOGLE_CLIENT_ID="optional"
PORT=8000
```

Run the API:

```bash
npm run dev
```

The backend serves redirects at:
- `GET /:shortURL` → resolves and redirects + logs analytics

And API routes under:
- `POST /api/auth/*`
- `POST /api/url/create`
- `GET /api/url/links`
- `PUT /api/url/edit/:shortURL`
- `DELETE /api/url/delete/:shortURL`

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`.

## Configuration notes

### Frontend API base URL

The frontend currently uses a hard-coded API base URL in `frontend/src/utility/ApiService.js`:

- `API_BASE_URL = 'https://lk-sigma.vercel.app/api'`

For local development, update it to your backend, for example:

- `http://localhost:8000/api`

### CORS

Backend CORS allowlist is configured in `Backend/index.js` (edit `allowedOrigins` for your frontend URL).

## Tracking accuracy notes (Gmail / email clients)

Email clients and security scanners may **prefetch** links and **proxy images**, which can generate multiple “hits” that look like clicks.

This project’s redirect endpoint supports:
- **Event classification**: `click` vs `prefetch` vs `image_proxy` vs `bot`
- **Deduping**: marks recent repeat hits as non‑unique to improve “unique click/visitor” reporting

## Build & deploy

### Frontend

```bash
cd frontend
npm run build
```

Serve the production build:

```bash
npx serve -s build
```

### Backend

```bash
cd Backend
npm start
```

Deploy the backend to any Node hosting (Render/Vercel serverless/VM). Ensure environment variables are set.

## Troubleshooting

- **`npm i` fails at repo root**: there is no root `package.json`. Install separately in `frontend/` and `Backend/`.
- **Charts show no data**: ensure links have `pastAnalytics` events and that the frontend is pointing to the correct API base URL.
- **Clicks look inflated from Gmail**: expect prefetch/proxy events; use unique metrics for reporting.

## License

This repository is currently unlicensed. Add a license file if you plan to distribute it publicly.
