# backend/app/utils.py
import pandas as pd

import pandas as pd

def compute_metrics(df: pd.DataFrame) -> dict:
    """
    More realistic CIBIL-like score calculation for hackathon demo.
    - Starts at 700 (mid-range)
    - Deducts more aggressively for late payments
    - Deducts for high credit utilization
    - Deducts for many new accounts
    - Adds bonus for perfect behavior
    """
    # Normalize Paid On Time -> boolean
    df['Paid On Time'] = df['Paid On Time'].astype(str).str.lower().isin(['true','1','yes','y'])

    # Count late payments
    late_payments = int(df[~df['Paid On Time']].shape[0])

    # Calculate credit utilization
    credit_df = df[df['Type'].str.lower().str.contains('credit', na=False)]
    outstanding_credit = float(credit_df['Amount'].sum()) if not credit_df.empty else 0.0

    # Use Credit Limit if available, else default to 100000
    if 'Credit Limit' in df.columns:
        try:
            total_limit = float(credit_df['Credit Limit'].sum())
            if total_limit <= 0:
                total_limit = 100000.0
        except:
            total_limit = 100000.0
    else:
        total_limit = 100000.0

    credit_utilization = (outstanding_credit / total_limit) * 100 if total_limit else 0.0

    # Count distinct accounts
    new_accounts_last_year = int(df['Loan/CC Name'].nunique())

    # --- New scoring logic ---
    score = 700  # start from mid-range
    score -= late_payments * 30  # penalize more per late payment
    score -= max(0, credit_utilization - 20) * 2  # utilization > 20% deducts
    score -= new_accounts_last_year * 5  # many accounts reduce score

    # bonus for perfect behavior
    if late_payments == 0 and credit_utilization < 30:
        score += 50

    # Clamp score between 300 and 850 (realistic range)
    score = int(max(300, min(850, score)))

    return {
        "score": score,
        "late_payments": late_payments,
        "credit_utilization_percent": round(credit_utilization, 2),
        "new_accounts_last_year": new_accounts_last_year
    }
