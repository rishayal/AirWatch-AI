# AirWatch AI 🌍
A hackathon MVP for community-powered local air-quality awareness.

## Features
- Interactive Leaflet map
- Open-Meteo air-quality readings (US AQI, PM2.5, PM10)
- Hourly trend chart
- Community reports with pending/verified/rejected status
- Statistical anomaly flag and transparent baseline estimate\n- Browser geolocation (only after the visitor chooses “Use my location”) with city search and presets (worldwide)\n- modeled-AQI hotspot comparison around any chosen area\n- Community report category patterns and suggested actions
- FastAPI + SQLAlchemy; SQLite locally, PostgreSQL in deployment

**Important data note:** Open-Meteo air-quality values are model-based grid estimates, not street-level sensor readings. Community reports are observations, not measurements, and remain unverified until reviewed. The included verification endpoint is intentionally unauthenticated for a local hackathon demo; protect it with moderator authentication before deployment.

## Requirements
Python 3.10+, Node.js 18+, Git. PostgreSQL is optional locally; SQLite is used by default.

## Start backend (VS Code terminal 1)
```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
# Optional: copy .env.example to .env and edit DATABASE_URL
uvicorn app.main:app --reload
```
API: http://127.0.0.1:8000 · Swagger: http://127.0.0.1:8000/docs

## Start frontend (VS Code terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. For location-specific readings, press **Use my location** and allow the browser permission prompt. If permission is declined or unavailable, search for your city (or pick a preset). Browser geolocation generally requires HTTPS or localhost.

## PostgreSQL
Create database `airwatch`, then set in `backend/.env`:
```env
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/airwatch
FRONTEND_ORIGIN=http://localhost:5173
```

## API
- `GET /api/health`
- `GET /api/locations`
- `GET /api/air-quality?latitude=31.5204&longitude=74.3587&past_days=2`
- `GET /api/insights?latitude=31.5204&longitude=74.3587`\n- `GET /api/geocode?q=London` (city search)\n- `GET /api/hotspots?latitude=..&longitude=..&name=..` (six query points around any location; Lahore demo points if omitted)\n- `GET /api/community-insights` (report category counts and suggested action)
- `GET /api/reports`
- `POST /api/reports`
- `PATCH /api/reports/{id}/verify?decision=verified` (demo-only; secure before deployment)

## Push to GitHub
Create an empty GitHub repository named `airwatch-ai`, then run from this folder:
```bash
git init
git add .
git commit -m "Build AirWatch AI MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/airwatch-ai.git
git push -u origin main
```

## Before production
Add authentication/roles, protected moderator routes, rate limits, input moderation, image storage with size/type checks, migrations (Alembic), tests, logging, privacy policy, and deployment secrets. Add a trusted sensor network if you need street-level measured readings.

Data source and attribution: Open-Meteo Air Quality API / Copernicus Atmosphere Monitoring Service (CAMS): https://open-meteo.com/en/docs/air-quality-api. Check current terms and attribution requirements before deployment.
