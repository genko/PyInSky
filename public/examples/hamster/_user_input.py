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

