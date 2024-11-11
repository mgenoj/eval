# app/scripts/check_for_drift.py
import sys
import asyncio
from services.evaluation_engine import EvaluationEngine
from utils.database import connect_to_mongo

def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(check_drift())

async def check_drift():
    db_client = connect_to_mongo()
    db = db_client.magnusscope
    engine = EvaluationEngine(db)
    drift_score = engine.calculate_drift([], [])
    threshold = engine.drift_threshold
    if drift_score > threshold:
        print(f"Drift detected: {drift_score} exceeds threshold {threshold}")
        sys.exit(1)
    else:
        print(f"No drift detected: {drift_score} within threshold {threshold}")
    db_client.close()

if __name__ == "__main__":
    main()
