class Channel:
    max_messages = 10
    def __init__(self, participants) -> None:
        self.participants = participants
        self.messages = []

    def add_message(self, message):
        while len(self.messages) >= self.max_messages:
            self.messages.pop(0)
        self.messages.append(message)

class ChannelMessage:
    def __init__(self, sender, message) -> None:
        self.sender = sender
        self.message = message


def something():
    pass