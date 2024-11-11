# app/services/evaluation_engine.py
from services.azure_openai import AzureOpenAIClient
from services.langgraph_integration import LangGraphAgent
from models.evaluation import EvaluationResult
import numpy as np
import json
import os
import asyncio
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from services.notification_service import NotificationService

class EvaluationEngine:
    def __init__(self, db):
        self.openai_client = AzureOpenAIClient()
        self.langgraph_agent = LangGraphAgent()
        self.db = db
        self.drift_threshold = 0.1  # Set your threshold
        self.notification_service = NotificationService()

    async def run_offline_evaluation(self, params):
        dataset = await self.load_dataset(params['dataset_id'])
        results = []

        for data in dataset:
            input_text = data['input']
            expected_output = data['expected_output']

            model_response = await self.openai_client.generate_text(input_text)

            ai_judge_score = await self.evaluate_with_ai_judge(model_response, expected_output)
            similarity_score = self.calculate_similarity(model_response, expected_output)
            functional_test_result = self.run_functional_tests(model_response)

            result = EvaluationResult(
                input=input_text,
                model_response=model_response,
                ai_judge_score=ai_judge_score,
                similarity_score=similarity_score,
                functional_test_result=functional_test_result,
                trace_id=model_response.trace_id
            )
            results.append(result.dict())

        await self.save_evaluation_results(results)
        return results

    async def load_dataset(self, dataset_id):
        # Load dataset from DB or file system
        dataset = await self.db["datasets"].find_one({"_id": dataset_id})
        return dataset['data']

    async def evaluate_with_ai_judge(self, model_response, expected_output):
        prompt = (
            f"Please score the model's response on a scale of 1 to 10.\n"
            f"Model Response: {model_response}\n"
            f"Expected Response: {expected_output}\n"
            f"Score:"
        )
        score = await self.openai_client.generate_text(prompt)
        return float(score)

    def calculate_similarity(self, response, expected):
        vectorizer = TfidfVectorizer().fit_transform([response, expected])
        vectors = vectorizer.toarray()
        cosine = cosine_similarity(vectors)
        return cosine[0][1]

    def run_functional_tests(self, response):
        results = {}
        # JSON Format Test
        try:
            data = json.loads(response)
            results['is_valid_json'] = True
        except ValueError:
            results['is_valid_json'] = False
        # Additional custom tests...
        return results

    async def save_evaluation_results(self, results):
        await self.db["evaluations"].insert_many(results)
        # Save traces if necessary

    async def monitor_drift(self):
        recent_outputs = await self.get_recent_model_outputs()
        baseline_outputs = await self.get_baseline_outputs()
        drift_score = self.calculate_drift(recent_outputs, baseline_outputs)
        if drift_score > self.drift_threshold:
            await self.send_alert(drift_score)

    def calculate_drift(self, recent_outputs, baseline_outputs):
        # Implement drift calculation
        drift_score = np.random.rand()  # Placeholder
        return drift_score

    async def send_alert(self, drift_score):
        message = f"Drift detected with score: {drift_score}"
        await self.send_slack_message(message)

    async def send_slack_message(self, message):
        webhook_url = os.getenv('SLACK_WEBHOOK_URL')
        async with aiohttp.ClientSession() as session:
            payload = {'text': message}
            await session.post(webhook_url, json=payload)

    async def scheduled_drift_monitoring(self):
        while True:
            await self.monitor_drift()
            await asyncio.sleep(3600)  # Run every hour
            
    async def send_alert(self, drift_score):
            subject = "MagnusScope Drift Alert"
            message = f"Drift detected with score: {drift_score}"
            self.notification_service.send_email_alert(subject, message)