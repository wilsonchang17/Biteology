from flask import Flask, request, jsonify
from .gpt_recipes import generate_recipe

app = Flask(__name__)

@app.route('/generate_recipe', methods=['POST'])
def generate_recipe_route():
    data = request.json
    ingredients = data.get('ingredients', [])
    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    recipe = generate_recipe(ingredients)
    return jsonify({"recipe": recipe})