import requests
import sqlite3

def search_db(name, year):
        
    # Connect to the db
    conn = sqlite3.connect(('players.db'))
    c = conn.cursor()
    
    # Create an array to hold the db query results
    results = []
    
    # Execute db query based on the last name searched by user
    for row in c.execute("SELECT * FROM all_players WHERE last_name LIKE ?", ('%'+name+'%',)).fetchall():
            results.append(row)
    
    # Base url to make 
    base_url = 'https://www.balldontlie.io/api/v1/season_averages?season=' + year
    
    # create a string of all the player IDs to query
    player_ids_query = ''
    
    for result in results:
        player_ids_query += '&player_ids[]=' + str(result[0])

    res = requests.get(base_url + player_ids_query).json()
    
    data = res['data']
    
    # Create dictionary to print results to endpoint
    player_json = {}
    
    # Loop through response data and add each player to player_json dictionary
    for player in data:
        for result in results:
            if player['player_id'] == result[0]:
                key = result[1] + " " + result[2]
                player_json[key] = player
    
    conn.close()
    
    return player_json