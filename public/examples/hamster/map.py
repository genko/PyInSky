# map.py

from textures import Textures


class Map:
    """ define map, endpoint and inital player position here """

    def __init__(self):
        self.initial_player_position = {"x": 5, "y": 6}
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

        textures = Textures()
        self.water_texture = textures.water()
        self.grass_texture = textures.grass()
        self.wall_texture = textures.wall()
        self.target_texture = textures.target()
        self.player_texture = textures.player()

    def _enumerate(self, iterable) -> (int, object):
        """ enumerate is not available... """
        i = -1
        for entry in iterable:
            i = i + 1
            yield (i, entry)

    def render_map(self, renderer):
        for (j, row) in self._enumerate(self.map):
            for (i, mapTile) in self._enumerate(row):
                if mapTile == 0:
                    renderer.create_texture(self.water_texture, i, j)
                if mapTile == 1:
                    renderer.create_texture(self.grass_texture, i, j)
                if mapTile == 2:
                    renderer.create_texture(self.wall_texture, i, j)
                if mapTile == 3:
                    renderer.create_texture(self.target_texture, i, j)

    def render_player(self, renderer, player_position):
        renderer.create_texture(
            self.player_texture, player_position["x"], player_position["y"]
        )

