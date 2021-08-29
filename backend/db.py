import sqlite3
from api import all_players_list

conn = sqlite3.connect('players.db')

c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS all_players (
        id integer, 
        first_name text, 
        last_name text
        )""")


c.executemany("INSERT INTO all_players VALUES(?, ?, ?)", all_players_list)

conn.commit()


### Uncomment below for test queries ###
# for row in c.execute("SELECT * FROM all_players WHERE last_name LIKE ?", ('%'+'davis'+'%',)).fetchall():
#     print(row)


###########
# Test - Take an example query and run an api call.
# Gather stats based on query and print results
###########

# year = '2020'

# results = []

# Execute db query based on the last name searched by user
# for row in c.execute("SELECT * FROM all_players WHERE last_name LIKE ?", ('%'+'davis'+'%',)).fetchall():
#         results.append(row)

# Base url to make 
# base_url = 'https://www.balldontlie.io/api/v1/season_averages?season=' + year

# create a string of all the player IDs to query
# player_ids_query = ''

# for result in results:
#     player_ids_query += '&player_ids[]=' + str(result[0])

# res = requests.get(base_url + player_ids_query).json()

# data = res['data']

# Create dictionary to print results to endpoint

# player_json = {}

# for player in data:
#     for result in results:
#         if player['player_id'] == result[0]:
#             key = result[1] + "_" + result[2]
#             player_json[key] = player

# print(player_json)

conn.close()