from flask import render_template, current_app as app

@app.route('/')
def index():
    return render_template('index.html', title="Welcome to Biteology")