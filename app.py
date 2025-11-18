import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response, session
from pymongo import MongoClient
from pymongo.server_api import ServerApi
load_dotenv()

uri = os.getenv('MONGO-URL')

client = MongoClient(uri, server_api=ServerApi('1'))

db = client['CloudBoard']
users = db['users']
uploads = db['uploads']

app = Flask(__name__)
app.secret_key = os.getenv('FLASK-SECRET-KEY')

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = users.find_one({"username" : data['username']})
    if user == None:
        return jsonify({'success' : False, 'description' : "No User found"}), 401
    if data['username'] == user['username']and data['password'] == user['password']:
        session['username'] = user['username']
        return jsonify({'success': True, 'username': data['username']}), 200
    return jsonify({'success' : False, 'description' : "Failed login incorrect username/pass"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    if 'username' in session:
        session.pop('username')
        return jsonify(success="True"), 200
    else:
        return jsonify(success="False"), 400

@app.route("/register", methods=["POST"])
def register():
    if 'username' in session:
        return jsonify({'success': False, 'description' : 'Already logged in'}), 409
    data = request.get_json()
    username = data['username']

    if users.find_one({"username" : username}) == None:
        users.insert_one({"username": username, "password" : data['password']})
        session['username'] = username
        return jsonify({'success' : True, 'username' : data['username']})
    else:
        return jsonify({'success' : False, 'description': 'User already exists'}) , 409

@app.route("/api/send" , methods=['POST'])
def send_payload():
    if not 'username' in session:
        return jsonify({'success': False, 'description' : 'Not Logged in'}), 401
    uploads.insert_one({'username' : session['username'], 'payload' : request.json['content'], 'date' : request.json['date']})
    return jsonify({'success': True, 'description' : 'Sent Payload : ' + str(request.json)}) , 200
    
