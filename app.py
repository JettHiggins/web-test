import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response, session
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bson.json_util as json_util
from bson import ObjectId
from datetime import datetime


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

# Can change DB storage to only store one item per username - most recent uploaded 
@app.route("/api/send" , methods=['POST'])
def send_payload():
    if not 'username' in session:
        return jsonify({'success': False, 'description' : 'Not Logged in'}), 401

    # Find User ID -- protect user data
    user = users.find_one({"username": session['username']})

    #insert user ID with data - Automatically deletes in 10 seconds 
    uploads.insert_one({'user_id' : user['_id'], 'payload' : request.json['payload'], 'date-created' : datetime.fromisoformat(request.json['date'])})
    return jsonify({'success': True, 'description' : 'Sent Payload : ' + str(request.json)}) , 200

@app.route("/api/recieve", methods=['POST'])
def recieve_board():
    if not 'username' in session:
        return jsonify({'success' : False, "description" : 'Not Logged in'}), 401
    
    user = users.find_one({"username" : session['username']})
    upload = uploads.find_one({'user_id' : ObjectId(str(user['_id']))})
    if upload == None:
        return jsonify({'success' : True, "description" : 'Nothing on the Clipboard'}), 400
    else:
        return jsonify({'success' : True, 'payload' : upload['payload'], 'description' : 'Pasted from Clipboard'}), 200