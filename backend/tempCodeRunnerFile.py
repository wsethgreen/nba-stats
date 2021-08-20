for player in all_players_data:
    
#     player_id = str(player['id'])
    
#     player_json = requests.get(single_player_api_url + player_id).json()
    
#     # print(player_json)
    
#     if len(player_json['data']) >= 1:
#         new_player = Player(player_json['data']['id'], player_json['data']['first_name'], player_json['data']['last_name'])
#         player_objects.append(new_player)

# print(len(player_objects))