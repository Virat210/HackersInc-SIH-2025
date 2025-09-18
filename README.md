# HackersInc-SIH-2025
# AI-Crop-Yield-Prediction (MVP)

## Quick start (backend)
1. cd backend
2. python -m venv venv
3. source venv/bin/activate
4. pip install -r requirements.txt
5. python train_model.py   # generates data & model
6. uvicorn app:app --reload --port 8000

## Quick start (frontend)
1. cd frontend
2. npm install
3. npm start
4. Open http://localhost:3000

## Endpoints
- POST /predict  -> expects JSON (avg_temp, rainfall, soil_ph, soil_n, soil_p, soil_k, seed_quality, area_ha)
- POST /recommendations -> same JSON, returns recommended actions
