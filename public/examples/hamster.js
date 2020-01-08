examples["hamster"] = {    "main.py": `from _main import nutze_tasten, laufe, links, start


def wiederhole(operation, anzahl):
    for _ in range(0, anzahl):
        operation()


def rechts():
    wiederhole(links, 3)


# def anweisungen():
# Möglichkeit 1:
# nutze_tasten()

# Möglichkeit 2:
laufe()
laufe()
laufe()
laufe()
rechts()
laufe()
laufe()
laufe()
links()
laufe()
laufe()

# Startet das Spiel
start()
`,
    "_player_operations.py": `''' simple definition of possible operations '''

class PlayerOperations:
    MOVE = 0
    TURN_LEFT = 1
    COLLECT = 2
    DROP = 3
`,
    "_main.py": `""" imports """

from _renderer import Renderer
from _user_input import UserInput
from _map import Map
from _map_renderer import MapRenderer
from _textures import Textures

from _player_orientation import PlayerOrientation
from _player_operations import PlayerOperations

from _verify_operations import is_player_position_valid, is_player_at_goal


""" create objects """

game_map = Map()
renderer = Renderer()
textures = Textures()
user_input = UserInput()
map_renderer = MapRenderer(renderer, game_map, textures)


""" define globals """

USE_HARDKEYS = False  # by default, users should programm the operations
ORIENTATION = game_map.initial_player_orientation  # use intitial orientation
OPERATIONS = []  # start with no operations


""" high level operations """

# store line numbers such as there is the possibiliy to print invalid operations
def laufe():
    global OPERATIONS
    OPERATIONS.append(PlayerOperations.MOVE)


def links():
    global OPERATIONS
    OPERATIONS.append(PlayerOperations.TURN_LEFT)


def nutze_tasten():
    global USE_HARDKEYS
    USE_HARDKEYS = True


""" fixed """


def _handle_turn_left(current_orientation: PlayerOrientation) -> PlayerOrientation:
    if current_orientation == PlayerOrientation.EAST:
        return PlayerOrientation.NORTH
    elif current_orientation == PlayerOrientation.NORTH:
        return PlayerOrientation.WEST
    elif current_orientation == PlayerOrientation.WEST:
        return PlayerOrientation.SOUTH
    elif current_orientation == PlayerOrientation.SOUTH:
        return PlayerOrientation.EAST


def _handle_move(current_orientation: PlayerOrientation, current_player_position: PlayerOperations) -> PlayerOrientation:
    if current_orientation == PlayerOrientation.EAST:
        return user_input.on_right(current_player_position)
    elif current_orientation == PlayerOrientation.NORTH:
        return user_input.on_up(current_player_position)
    elif current_orientation == PlayerOrientation.WEST:
        return user_input.on_left(current_player_position)
    elif current_orientation == PlayerOrientation.SOUTH:
        return user_input.on_down(current_player_position)


def handle_user_input(orientation, player_position, operations, operation_index):
    """ enables to learn programming the easy way """

    if operations[operation_index] == PlayerOperations.TURN_LEFT:
        orientation = _handle_turn_left(orientation)
    if operations[operation_index] == PlayerOperations.MOVE:
        player_position = _handle_move(orientation, player_position)

    return orientation, player_position, operation_index + 1


# todo> improve start method
def start():
    global ORIENTATION, OPERATIONS


    operation_index = 0  # set this to 0 to use programmatic version
    player_position = game_map.initial_player_position
    while True:

        # todo> improve mode handling
        if USE_HARDKEYS:
            next_player_position = user_input.handle_key_input(player_position)
        else:
            ORIENTATION, next_player_position, operation_index = handle_user_input(
                ORIENTATION, player_position, OPERATIONS, operation_index
            )


        # todo> improve message in case of player position is not possible
        if is_player_position_valid(game_map, next_player_position):
            player_position = next_player_position

        # todo> add checks if player is killed by e. g. a cat


        # render map & player
        map_renderer.render_map(renderer)
        map_renderer.render_player(renderer, player_position)
        renderer.render()


        # todo> improve level ending checks
        if is_player_at_goal(game_map, player_position):
            print("Level gelöst!")
            break

        if not USE_HARDKEYS:
            if operation_index >= len(OPERATIONS):
                print("Level ist nicht gelöst, aber es wurden alle Befehle ausgeführt!")
                break

`,
    "_player_orientation.py": `''' simple definition of possible orientations '''

class PlayerOrientation:
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3
`,
    "_map.py": `# map.py

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
`,
    "_map_renderer.py": `from _map import Map
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

`,
    "_renderer.py": `import upygame


class Renderer:
    """ The Renderer is designed to hide api-calls """

    execute_high_resolution = True  # which is 220×176 instead of 110×88
    offset_x = 3  # int ((110 % 8) / 2.0)
    offset_y = 0  # int (( 88 % 8) / 2.0)
    px_per_field = 16 if execute_high_resolution else 8

    def __init__(self):
        print("Renderer setup...")
        self.screen = upygame.display.set_mode()

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
    "_user_input.py": `import upygame


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

`,
    "_textures.py": `import upygame


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

    def goal(self):
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
    "_verify_operations.py": `''' this is a set of verification operations '''


def is_player_position_valid(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile != 2 and tile != 0


def is_player_at_goal(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile == 3
`};
