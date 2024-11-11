# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, evaluations, observability
from utils.database import connect_to_mongo
from services.evaluation_engine import EvaluationEngine
import os
import asyncio

app = FastAPI(title="MagnusScope API")

# CORS configuration
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = connect_to_mongo()
    app.database = app.mongodb_client.magnusscope
    app.evaluation_engine = EvaluationEngine(app.database)

    # Start drift monitoring
    asyncio.create_task(app.evaluation_engine.scheduled_drift_monitoring())

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(evaluations.router, prefix="/evaluations", tags=["Evaluations"])
app.include_router(observability.router, prefix="/observability", tags=["Observability"])
