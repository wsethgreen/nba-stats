from flask import Blueprint, request
from search_func import search_db

search = Blueprint("search", __name__)

@search.route('/test')
def test():
    return 'test'

@search.route('/<name>/<year>', methods=['GET','POST'])
def search_blueprint(name, year):
    
    if request.method == 'GET':
        
        player_json = search_db(name, year)
        
        return player_json