from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # 注册 Blueprint
    with app.app_context():
        from .routes import routes
        app.register_blueprint(routes)

    return app