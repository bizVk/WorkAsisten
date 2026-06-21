from flask import Blueprint, render_template, request, jsonify

auth_bp = Blueprint("auth", __name__)

users = {
    "admin": "1234",
    "manager": "5678"
}


@auth_bp.route("/")
def home():
    return render_template("auth/index.html")


@auth_bp.route("/login", methods=["POST"])
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