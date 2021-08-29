import requests
from requests.api import request
from Player import Player


# Run initial api call to get all players listed.
# Add a base url and then add 'players', 'stats', etc.
all_players_api_url = 'https://www.balldontlie.io/api/v1/players?per_page=100&page='
all_players_json = requests.get(all_players_api_url).json()

# api call total page number variable
total_page_numbers = all_players_json['meta']['total_pages']

# Array to hold all players from api
# Each item/player in the list will include:
# index 0 = player id
# index 1 = player first name
# index 2 = player last name
all_players_list = []

# Array to hold all player objects who have stats in the 2020 season
active_player_objects =[]

def get_response(base_url, page_number):
    res = requests.get(base_url + page_number).json()
    data = res['data']
    return data

def parse_json(response):
    
    for player in response:
        new_player = Player(player['id'], player['first_name'], player['last_name'])
        all_players_list.append(new_player)


for page in range(1, total_page_numbers + 1):
    
    try:
        page_string = str(page)
        parse_json(get_response(all_players_api_url, page_string))
    except:
        print("api request limit met")


