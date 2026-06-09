from flask import Flask, render_template, request, jsonify
import os 
import json
import pandas as pd

df = pd.read_csv("data/crm/crm_interactions.csv")

with open("config/data_files.json") as f:
    paths = json.load(f)

print(os.listdir("templates"))

# =========================
# App Initialization
# =========================
app = Flask(__name__)

# =========================
# Demo Users
# =========================
users = {
    "admin": "1234",
    "manager": "5678"
}

# =========================
# LIVE TASK DATA (fake DB)
# =========================
tasks = [
    {"id": 1, "type": "Plumbing", "task": "Fix bathroom leak"},
    {"id": 2, "type": "Electrician", "task": "Repair AC wiring"},
    {"id": 3, "type": "Housekeeping", "task": "Clean Room 205"}
]

# =========================
# HOME (LOGIN PAGE)
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# LOGIN API
# =========================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    userid = data.get("userid")
    password = data.get("password")

    if userid in users and users[userid] == password:
        return jsonify({
            "status": "success",
            "message": "Login Successful"
        })

    return jsonify({
        "status": "error",
        "message": "Invalid User ID or Password"
    })


# =========================
# DASHBOARD PAGE
# =========================
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


# =========================
# GET TASKS
# =========================
@app.route("/get_tasks")
def get_tasks():
    return jsonify(tasks)


# =========================
# ADD TASK
# =========================
@app.route("/add_task", methods=["POST"])
def add_task():
    data = request.get_json()

    new_task = {
        "id": len(tasks) + 1,
        "type": data.get("type"),
        "task": data.get("task")
    }

    tasks.append(new_task)

    return jsonify({
        "status": "success",
        "tasks": tasks
    })
@app.route("/delete_task/<int:task_id>")
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]

    return jsonify({"status": "deleted"})

@app.route('/reservations')
def reservations():
    return render_template('reservations.html')

@app.route('/kitchen')
def kitchen():
    return render_template('kitchen.html')

@app.route('/laundry')
def laundry():
    return render_template('laundry.html')

@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/procurement')
def procurement():
    return render_template('procurement.html')

@app.route('/hr')
def hr():
    return render_template('hr.html')

@app.route('/marketing')
def marketing():
    return render_template('marketing.html')

@app.route('/crm')
def crm():

    guests_df = pd.read_csv(
        r"D:\worktracker\data\frontoffice\guests.csv"
    )

    crm_df = pd.read_csv(
        r"D:\worktracker\data\crm\crm_interactions.csv"
    )

    dashboard_df = pd.merge(
        guests_df,
        crm_df,
        on="GuestID",
        how="left"
    )

    records = dashboard_df.to_dict(orient="records")

    total_guests = len(guests_df)

    positive = len(crm_df[crm_df["Outcome"] == "Positive"])
    neutral = len(crm_df[crm_df["Outcome"] == "Neutral"])
    negative = len(crm_df[crm_df["Outcome"] == "Negative"])

    return render_template(
        "departments/crm.html",
        records=records,
        total_guests=total_guests,
        positive=positive,
        neutral=neutral,
        negative=negative
    )
@app.route('/itsupport')
def itsupport():
    return render_template('itsupport.html')

@app.route('/analytics')
def analytics():
    return render_template('analytics.html')

@app.route('/finance')
def finance():
    return render_template('finance.html')

@app.route('/transport')
def transport():
    return render_template('transport.html')

@app.route('/experience')
def experience():
    return render_template('experience.html')

@app.route('/corporate')
def corporate():
    return render_template('corporate.html')

@app.route('/banquets')
def banquets():
    return render_template('banquets.html')

@app.route('/sidebar')
def sidebar():
    return render_template('sidebar.html')

if __name__ == "__main__":
    app.run(debug=True)             



