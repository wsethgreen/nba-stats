from flask import Flask, request, jsonify
from flask_cors import CORS
from search import search

# Create App
app = Flask(__name__)
CORS(app)
app.register_blueprint(search, url_prefix='/search')



@app.route('/', methods = ["GET", "POST"])
def index():
    return "hello world"



if __name__ == '__main__':
    app.run(debug=True)