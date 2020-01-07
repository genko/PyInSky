# renderer.py

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

