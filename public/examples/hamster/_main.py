# main.py

from _renderer import Renderer
from _user_input import UserInput
from _map import Map

renderer = Renderer()
user_input = UserInput()
game_map = Map()


""" set mode """

USE_HARDKEYS = False


""" high level operations """

ORIENTATION = "east"  # todo> move this to Map and ensure texture is rendered correctly!
OPERATIONS = []


def laufe():
    global OPERATIONS
    OPERATIONS.append("laufe")


def links():
    global OPERATIONS
    OPERATIONS.append("links")


def nutze_tasten():
    global USE_HARDKEYS
    USE_HARDKEYS = True


def wiederhole(operation, anzahl):
    for _ in range(0, anzahl):
        operation()


""" fixed """


def is_player_position_valid(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile != 2 and tile != 0


def is_player_at_goal(game_map, position) -> bool:
    tile = game_map.map[position["y"]][position["x"]]
    return tile == 3


def handle_user_input(orientation, player_position, operations, operation_index):
    """ enables to learn programming the easy way """

    if operations[operation_index] == "links":
        if orientation == "east":
            orientation = "north"
        elif orientation == "north":
            orientation = "west"
        elif orientation == "west":
            orientation = "south"
        elif orientation == "south":
            orientation = "east"

    if operations[operation_index] == "laufe":
        if orientation == "east":
            player_position = user_input.on_right(player_position)
        elif orientation == "north":
            player_position = user_input.on_up(player_position)
        elif orientation == "west":
            player_position = user_input.on_left(player_position)
        elif orientation == "south":
            player_position = user_input.on_down(player_position)

    return orientation, player_position, operation_index + 1


def start():
    global ORIENTATION, OPERATIONS

    # request actions of player from public main
    # anweisungen()

    operation_index = 0  # set this to 0 to use programmatic version
    player_position = game_map.initial_player_position
    while True:
        if USE_HARDKEYS:
            next_player_position = user_input.handle_key_input(player_position)
        else:
            ORIENTATION, next_player_position, operation_index = handle_user_input(
                ORIENTATION, player_position, OPERATIONS, operation_index
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
            if operation_index >= len(OPERATIONS):
                print("level is not solved but there are no more commands specified!")
                break

