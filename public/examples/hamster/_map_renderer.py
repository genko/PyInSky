from _map import Map
from _renderer import Renderer
from _textures import Textures


class MapRenderer:
    """ define map, endpoint and inital player position here """

    def __init__(self, renderer: Renderer, map: Map, textures: Textures):
        self.map = map
        self.renderer = renderer
        self.textures = textures

        # fetch resources only once
        self.water_texture = textures.water()
        self.grass_texture = textures.grass()
        self.wall_texture = textures.wall()
        self.goal_texture = textures.goal()
        self.player_texture = textures.player()

    def _enumerate(self, iterable) -> (int, object):
        """ enumerate is not available... """
        i = -1
        for entry in iterable:
            i = i + 1
            yield (i, entry)

    def render_map(self, renderer):
        for (j, row) in self._enumerate(self.map.map):
            for (i, mapTile) in self._enumerate(row):
                if mapTile == self.map.WATER:
                    renderer.create_texture(self.water_texture, i, j)
                if mapTile == self.map.GRASS:
                    renderer.create_texture(self.grass_texture, i, j)
                if mapTile == self.map.WALL:
                    renderer.create_texture(self.wall_texture, i, j)
                if mapTile == self.map.GOAL:
                    renderer.create_texture(self.goal_texture, i, j)

    def render_player(self, renderer, player_position):
        self.renderer.create_texture(
            self.player_texture, player_position["x"], player_position["y"]
        )

