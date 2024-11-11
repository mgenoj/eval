# app/routers/observability.py
from fastapi import APIRouter, Depends
from models.user import User
from utils.auth_utils import get_current_user

router = APIRouter()

@router.get("/traces")
async def get_traces(current_user: User = Depends(get_current_user)):
    traces = await router.app.database["traces"].find().to_list(length=100)
    for trace in traces:
        trace['id'] = str(trace['_id'])
    return traces

@router.get("/alerts")
async def get_alerts(current_user: User = Depends(get_current_user)):
    alerts = await router.app.database["alerts"].find().to_list(length=100)
    return alerts
