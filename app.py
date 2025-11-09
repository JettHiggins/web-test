from flask import Flask
from flask import render_template, request, redirect, url_for, jsonify, make_response
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login", methods=["POST"])
def login():
    return "Testing"
    