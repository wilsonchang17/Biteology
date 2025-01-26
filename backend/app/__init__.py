from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # 啟用跨域請求（CORS）以允許 React 與 Flask 通信
    CORS(app)

    # 載入路由
    with app.app_context():
        from . import routes

    return app