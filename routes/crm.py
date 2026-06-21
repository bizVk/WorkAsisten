from flask import Blueprint, render_template
import pandas as pd

crm_bp = Blueprint("crm", __name__)

@crm_bp.route("/crm")
def crm():

    guests_df = pd.read_csv("data/frontoffice/guests.csv")
    crm_df = pd.read_csv("data/crm/crm_interactions.csv")

    merged = pd.merge(guests_df, crm_df, on="GuestID", how="left")

    return render_template(
        "departments/crm.html",
        records=merged.to_dict(orient="records"),
        total_guests=len(guests_df)
    )