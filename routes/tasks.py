from flask import Blueprint, jsonify, request

tasks_bp = Blueprint("tasks", __name__)

tasks = [
    {"id": 1, "type": "Plumbing", "task": "Fix bathroom leak"},
    {"id": 2, "type": "Electrician", "task": "Repair AC wiring"},
    {"id": 3, "type": "Housekeeping", "task": "Clean Room 205"}
]

@tasks_bp.route("/get_tasks")
def get_tasks():
    return jsonify(tasks)

@tasks_bp.route("/add_task", methods=["POST"])
def add_task():
    data = request.get_json()

    new_task = {
        "id": len(tasks) + 1,
        "type": data.get("type"),
        "task": data.get("task")
    }

    tasks.append(new_task)
    return jsonify({"status": "success", "tasks": tasks})