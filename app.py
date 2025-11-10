from flask import Flask
from flask import render_template, request, redirect, url_for, jsonify, make_response
app = Flask(__name__)
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
       return {'username' : data['username']}   
    return jsonify(description="Failed login incorrect username/pass"), 400