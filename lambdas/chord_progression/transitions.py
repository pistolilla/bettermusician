import random

SEQUENCES = {
    "major": {
        "1": "2 3 4 5 6 7",
        "2": "5 7",
        "3": "2 4 6",
        "4": "2 5 7",
        "5": "1 6 7",
        "6": "2 4",
        "7": "1 5 6"
    },
    "minor": {
        "1": "2 3 4 5 6 7",
        "2": "4 5 7",
        "3": "2 4 6",
        "4": "1 3 5 7",
        "5": "1",
        "6": "1 2 4 5",
        "7": "1 3"
    },
    "harmonic minor": {
        "1": "2 3 4 5 6 7",
        "2": "5 7",
        "3": "2 4 6",
        "4": "2 5 7",
        "5": "1 6 7",
        "6": "2 4",
        "7": "1 5 6"
    },
}

def random_sequence(scale_type, size, seed:int=None, random_seed=None):
    if random_seed is not None:
        random.seed(random_seed)
    if seed is None:
        seed = random.randint(1, 7)
    result = [seed]
    while len(result) <= size:
        previous = str(result[-1])
        current = random.choice(SEQUENCES[scale_type][previous].split())
        result.append(int(current))
    return list(map(lambda x: x-1, result))
