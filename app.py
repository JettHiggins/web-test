import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response, session

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK-SECRET-KEY')

test_db = {
    'username' : 'Bobby',
    'password' : 'plaintext'
}

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if data['username'] == test_db['username'] and data['password'] == test_db['password']:
        session['username'] = data['username']
        return jsonify({'success': True, 'username': data['username']}), 200
    return jsonify({'success' : True, 'description' : "Failed login incorrect username/pass"}), 400

@app.route("/logout", methods=["POST"])
def logout():
    if 'username' in session:
        session.pop('username')
        return jsonify(success="True"), 200
    else:
        return jsonify(success="False"), 400