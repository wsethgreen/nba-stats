from flask import Flask
from flask.globals import request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create App
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nba-stats.db"
CORS(app)

# DB
db = SQLAlchemy(app)

# Player class to add new player to db
class Player(db.Model):
    id = db.Column('id', db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    first_name = db.Column(db.String(24))
    last_name = db.Column(db.String(24))

    # Constructor
    def __init__(self, id, first_name, last_name):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name


### Variables ###

last_name = ""

url_search = 'https://www.balldontlie.io/api/v1/players?search='

### Methods ###

def add_player_to_db(id, first_name, last_name):
    
    if (id and first_name and last_name):
        try:
            player = Player(id, first_name,last_name)
            db.session.add(player)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False
        

def search_for_player(last_name):
    
    json_response = url_search + last_name.lower().json()
    return json_response
    
    # for player in json_response['data']:
    #     player_id = player['id']
    #     player_first_name = player['first_name']
    #     player_last_name = player['last_name']
    #     add_player_to_db(player_id, player_first_name, player_last_name)


@app.route('/', methods = ["GET", "POST"])
def index():
    return "hello world"


@app.route('/getname', methods=['GET', 'POST'])
def get_name():
    
    data = request.get_json()
    
    if not data:
        return {'msg': 'Missing JSON'}, 400
    else:
        return data

# API route to add new player to db
@app.route('/addplayer', methods=["POST"])
def add_player_to_db():
    pass


if __name__ == '__main__':
    app.run(debug=True)