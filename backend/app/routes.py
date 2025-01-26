from flask import jsonify, request, current_app as app

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/data', methods=['POST'])
def process_data():
    data = request.json
    return jsonify({"received_data": data})