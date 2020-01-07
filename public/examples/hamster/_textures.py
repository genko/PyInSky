# textures.py

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
        pixels = b'\
\xbb\xbc\xcb\xbb\
\xbb\xbb\xcc\xbb\
\xbb\xbb\xbc\xcb\
\xbb\xbb\xbb\xcc\
\xcc\xbb\xbb\xbb\
\xbc\xcc\xbb\xbb\
\xbb\xbc\xcb\xbb\
\xbb\xbb\xcc\xbb\
'
        return upygame.surface.Surface(8, 8, pixels)

    def grass(self):
        pixels = b'\
\x82\x88\x88\x78\
\x89\x88\x88\x88\
\x88\x76\x28\x98\
\x88\x88\x87\x88\
\x88\x98\x88\x88\
\x82\x88\x68\x88\
\x88\x78\x88\x68\
\x88\x88\x88\x88\
'
        return upygame.surface.Surface(8, 8, pixels)

    def player(self):
        pixels = b'\
\x82\x88\x88\x78\
\x89\x8f\xf8\x88\
\x88\xff\xff\x98\
\x88\xfd\xdf\x88\
\x88\xfd\xdf\x88\
\x82\xff\xff\x88\
\x88\x7f\xf8\x68\
\x88\x88\x88\x88\
'
        return upygame.surface.Surface(8, 8, pixels)

    def wall(self):
        pixels = b'\
\x55\x22\x22\x55\
\x51\x11\x11\x15\
\x21\x11\x11\x12\
\x21\x11\x11\x12\
\x21\x11\x11\x12\
\x21\x11\x11\x12\
\x51\x11\x11\x15\
\x55\x22\x22\x55\
'
        return upygame.surface.Surface(8, 8, pixels)

    def target(self):
        pixels = b'\
\x00\x00\x00\x00\
\x03\x33\x33\x30\
\x03\x33\x33\x30\
\x00\x03\x30\x00\
\x00\x03\x30\x00\
\x00\x03\x30\x00\
\x00\x03\x30\x00\
\x00\x00\x00\x00\
'
        return upygame.surface.Surface(8, 8, pixels)
