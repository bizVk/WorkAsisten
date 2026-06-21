from flask import Flask
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.tasks import tasks_bp
from routes.frontoffice import frontoffice_bp
from routes.crm import crm_bp

app = Flask(__name__)

# =========================
# REGISTER BLUEPRINTS
# =========================
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(tasks_bp)
app.register_blueprint(frontoffice_bp)
app.register_blueprint(crm_bp)

if __name__ == "__main__":
    app.run(debug=True) 