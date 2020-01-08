from _main import nutze_tasten, laufe, links, start


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
