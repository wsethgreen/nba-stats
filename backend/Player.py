
# Player class
class Player():
    
    # Constructor
    def __init__(self, id, first_name, last_name):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
    
    base_url = 'https://www.balldontlie.io/api/v1/season_averages'