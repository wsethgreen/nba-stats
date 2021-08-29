import search_func
from unittest.mock import MagicMock

def test_search_db():
    
    garland_json = {
        "Darius Garland": {
            "ast": 6.09,
            "blk": 0.11,
            "dreb": 1.96,
            "fg3_pct": 0.395,
            "fg3a": 4.93,
            "fg3m": 1.94,
            "fg_pct": 0.451,
            "fga": 14.85,
            "fgm": 6.7,
            "ft_pct": 0.848,
            "fta": 2.44,
            "ftm": 2.07,
            "games_played": 54,
            "min": "33:08",
            "oreb": 0.43,
            "pf": 2.04,
            "player_id": 666581,
            "pts": 17.43,
            "reb": 2.39,
            "season": 2020,
            "stl": 1.22,
            "turnover": 3.04
        }
    }
    
    # Search for sqlite mocking for python
    
    
    mock_object(search_func.sqlite3.Cursor, 'execute', MagicMock(return_value=garland_json))
    
    assert search_func.search_db('garland', '2020') == garland_json

