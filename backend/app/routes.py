from flask import jsonify, render_template, current_app as app

@app.route('/')
def index():
    return render_template('index.html', title="Welcome to Biteology")

@app.route('/api/hello', methods=['GET'])
def hello_api():
    return jsonify({"message": "Hello from Flask!"})