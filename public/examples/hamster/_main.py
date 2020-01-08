""" imports """

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

