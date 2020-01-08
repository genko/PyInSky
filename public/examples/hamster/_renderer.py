import upygame


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

