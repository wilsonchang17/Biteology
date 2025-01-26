from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from .gpt_recipes import generate_recipe

# 使用 Blueprint 注册路由
routes = Blueprint('routes', __name__)

@routes.route('/generate_recipe', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:3000")
def generate_recipe_route():
    if request.method == 'OPTIONS':
        # 处理 CORS 预检请求
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    # 处理 POST 请求
    data = request.json
    ingredients = data.get('ingredients', [])
    meal = data.get('meal', '')
    type = data.get('type', '')

    if not ingredients or not meal or not type:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        recipe = generate_recipe(ingredients, meal, type)
        return jsonify({"recipe": recipe}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500