# app/models/evaluation.py
from pydantic import BaseModel
from typing import Any, Dict

class EvaluationResult(BaseModel):
    input: str
    model_response: str
    ai_judge_score: float
    similarity_score: float
    functional_test_result: Dict[str, Any]
    trace_id: str
