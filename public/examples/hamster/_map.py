# map.py

from _textures import Textures
from _player_orientation import PlayerOrientation


class Map:
    """ define map, endpoint and inital player position here """

    WATER = 0
    GRASS = 1
    WALL = 2
    GOAL = 3
    PLAYER = 4

    def __init__(self):
        self.initial_player_position = {"x": 5, "y": 6}
        self.initial_player_orientation = PlayerOrientation.EAST
        self.map = [  # 13 x 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 0],
            [0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
