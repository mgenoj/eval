# app/scripts/run_offline_evaluation.py
import argparse
import asyncio
from services.evaluation_engine import EvaluationEngine
from utils.database import connect_to_mongo

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dataset', type=str, required=True)
    args = parser.parse_args()

    loop = asyncio.get_event_loop()
    loop.run_until_complete(run_evaluation(args.dataset))

async def run_evaluation(dataset_id):
    db_client = connect_to_mongo()
    db = db_client.magnusscope
    engine = EvaluationEngine(db)
    params = {'dataset_id': dataset_id}
    await engine.run_offline_evaluation(params)
    db_client.close()

if __name__ == "__main__":
    main()
