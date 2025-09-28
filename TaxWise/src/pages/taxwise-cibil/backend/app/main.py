# backend/app/main.py
import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from app.utils import compute_metrics

app = FastAPI(title="TaxWise - CIBIL Advisor (demo)")

# allow local frontend ports
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """
    Accepts CSV upload, parses it with pandas, computes metrics and returns JSON.
    CSV must have columns: Date,Type,Amount,Loan/CC Name,Paid On Time (Credit Limit optional)
    """
    # basic file type check
    if not file.filename.lower().endswith((".csv", ".txt")):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")
    try:
        df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not parse CSV: {e}")

    required = {"Date", "Type", "Amount", "Loan/CC Name", "Paid On Time"}
    if not required.issubset(set(df.columns)):
        raise HTTPException(status_code=400, detail=f"CSV missing required columns. Required: {required}")

    # compute metrics and return
    metrics = compute_metrics(df)
    return {"status": "ok", "rows": len(df), "metrics": metrics}
