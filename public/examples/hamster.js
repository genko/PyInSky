examples["hamster"] = {    "main.py": `# main.py

from renderer import Renderer
from user_input import UserInput
from map import Map

renderer = Renderer()
user_input = UserInput()
game_map = Map()


""" set mode """

# USE_HARDKEYS = False
USE_HARDKEYS = True


""" high level operations """


def laufe():
    operations.append("laufen")


def drehe():
    operations.append("drehen")


def wiederhole(operation, anzahl):
    for i in range(0, anzahl):
        operation()


orientation = "east"  # todo> move this to Map and ensure texture is rendered correctly!
operations = []


""" user input """

laufe()
laufe()
laufe()
laufe()
wiederhole(drehe, 3)
laufe()
laufe()
laufe()
drehe()
wiederhole(laufe, 2)


""" fixed """


def is_player_position_valid(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile != 2 and tile != 0


def is_player_at_goal(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile == 3


def handle_user_input(orientation, player_position, operations, operation_index):
    """ enables to learn programming the easy way """

    if operations[operation_index] == "drehen":
        if orientation == "east":
            orientation = "north"
        elif orientation == "north":
            orientation = "west"
        elif orientation == "west":
            orientation = "south"
        elif orientation == "south":
            orientation = "east"

    if operations[operation_index] == "laufen":
        if orientation == "east":
            player_position = user_input.on_right(player_position)
        elif orientation == "north":
            player_position = user_input.on_up(player_position)
        elif orientation == "west":
            player_position = user_input.on_left(player_position)
        elif orientation == "south":
            player_position = user_input.on_down(player_position)

    return orientation, player_position, operation_index + 1


operation_index = 0  # set this to 0 to use programmatic version
player_position = game_map.initial_player_position
while True:
    if USE_HARDKEYS:
        next_player_position = user_input.handle_key_input(player_position)
    else:
        orientation, next_player_position, operation_index = handle_user_input(
            orientation, player_position, operations, operation_index
        )

    if is_player_position_valid(game_map, next_player_position):
        player_position = next_player_position

    # render map & player
    game_map.render_map(renderer)
    game_map.render_player(renderer, player_position)
    renderer.render()

    if is_player_at_goal(game_map, player_position):
        print("level solved!")
        break

    if not USE_HARDKEYS:
        if operation_index >= len(operations):
            print("level is not solved but there are no more commands specified!")
            break

`,
    "map.py": `# map.py

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

`,
    "renderer.py": `# renderer.py

import upygame


class Renderer:
    """ The Renderer is designed to hide api-calls """

    offset_x = 3  # int ((110 % 8) / 2.0)
    offset_y = 0  # int (( 88 % 8) / 2.0)
    px_per_field = 8

    def __init__(self):
        print("Renderer setup...")

        # Setup the screen which has a resolution of 110×88 (fastest resolution)
        # The highest possible resolution is 220×176 (high resolution)
        self.screen = upygame.display.set_mode()

        # 110x88 finally results in a playable raster of 8px:
        # x: 13 (and 6 unused px)
        # y: 11

    def create_texture(self, surface: upygame.surface.Surface, x: int, y: int) -> None:
        # Copy texture to screen memory
        self.screen.blit(
            surface,
            x * self.px_per_field + self.offset_x,
            y * self.px_per_field + self.offset_y,
        )

    def render(self) -> None:
        # Update the display
        upygame.display.flip()

`,
    "textures.py": `# textures.py

import upygame

# color scheme
upygame.display.set_palette_16bit([
0x0000,
0x52AA,
0xA534,
0xFFFF,
0xF800,
0xFBE0,
0xFFE0,
0x7FE0,
0x07E0,
0x07EF,
0x07FF,
0x03FF,
0x001F,
0x781F,
0xF81F,
0xF80E,
])


class Colours:
    BLACK = 0x0
    DARKGREY = 0x1
    LIGHTGREY = 0x2
    WHITE = 0x3
    ROT = 0x4
    ORANGE = 0x5
    YELLOW = 0x6
    LIMEGREEN = 0x7
    GREEN = 0x8
    GREENCYAN = 0x9
    CYAN = 0xA
    LIGHTBLUE = 0xB
    BLUE = 0xC
    PURPLE = 0xD
    PINK = 0xE
    ROSA = 0xF


class Textures:
    """ this class should define all textures used """

    def water(self):
        pixels = b'\\
\\xbb\\xbc\\xcb\\xbb\\
\\xbb\\xbb\\xcc\\xbb\\
\\xbb\\xbb\\xbc\\xcb\\
\\xbb\\xbb\\xbb\\xcc\\
\\xcc\\xbb\\xbb\\xbb\\
\\xbc\\xcc\\xbb\\xbb\\
\\xbb\\xbc\\xcb\\xbb\\
\\xbb\\xbb\\xcc\\xbb\\
'
        return upygame.surface.Surface(8, 8, pixels)

    def grass(self):
        pixels = b'\\
\\x82\\x88\\x88\\x78\\
\\x89\\x88\\x88\\x88\\
\\x88\\x76\\x28\\x98\\
\\x88\\x88\\x87\\x88\\
\\x88\\x98\\x88\\x88\\
\\x82\\x88\\x68\\x88\\
\\x88\\x78\\x88\\x68\\
\\x88\\x88\\x88\\x88\\
'
        return upygame.surface.Surface(8, 8, pixels)

    def player(self):
        pixels = b'\\
\\x82\\x88\\x88\\x78\\
\\x89\\x8f\\xf8\\x88\\
\\x88\\xff\\xff\\x98\\
\\x88\\xfd\\xdf\\x88\\
\\x88\\xfd\\xdf\\x88\\
\\x82\\xff\\xff\\x88\\
\\x88\\x7f\\xf8\\x68\\
\\x88\\x88\\x88\\x88\\
'
        return upygame.surface.Surface(8, 8, pixels)

    def wall(self):
        pixels = b'\\
\\x55\\x22\\x22\\x55\\
\\x51\\x11\\x11\\x15\\
\\x21\\x11\\x11\\x12\\
\\x21\\x11\\x11\\x12\\
\\x21\\x11\\x11\\x12\\
\\x21\\x11\\x11\\x12\\
\\x51\\x11\\x11\\x15\\
\\x55\\x22\\x22\\x55\\
'
        return upygame.surface.Surface(8, 8, pixels)

    def target(self):
        pixels = b'\\
\\x00\\x00\\x00\\x00\\
\\x03\\x33\\x33\\x30\\
\\x03\\x33\\x33\\x30\\
\\x00\\x03\\x30\\x00\\
\\x00\\x03\\x30\\x00\\
\\x00\\x03\\x30\\x00\\
\\x00\\x03\\x30\\x00\\
\\x00\\x00\\x00\\x00\\
'
        return upygame.surface.Surface(8, 8, pixels)
`,
    "user_input.py": `# user_input.py

import upygame


class UserInput:
    """ this class simplifies user input events """

    def _is_right_press_event(self, event) -> bool:
        return event.type == upygame.KEYDOWN and event.key == upygame.K_RIGHT

    def _is_left_press_event(self, event) -> bool:
        return event.type == upygame.KEYDOWN and event.key == upygame.K_LEFT

    def _is_up_press_event(self, event) -> bool:
        return event.type == upygame.KEYDOWN and event.key == upygame.K_UP

    def _is_down_press_event(self, event) -> bool:
        return event.type == upygame.KEYDOWN and event.key == upygame.K_DOWN

    def on_right(self, position):
        return {"x": position["x"] + 1, "y": position["y"]}

    def on_left(self, position):
        return {"x": position["x"] - 1, "y": position["y"]}

    def on_up(self, position):
        return {"x": position["x"], "y": position["y"] - 1}

    def on_down(self, position):
        return {"x": position["x"], "y": position["y"] + 1}

    def handle_key_input(self, position):
        event = upygame.event.poll()
        if event == upygame.NOEVENT:
            return position

        if self._is_up_press_event(event):
            position = self.on_up(position)
        if self._is_right_press_event(event):
            position = self.on_right(position)
        if self._is_down_press_event(event):
            position = self.on_down(position)
        if self._is_left_press_event(event):
            position = self.on_left(position)

        return position

`};
