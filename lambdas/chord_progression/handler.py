import random
import json
from http import HTTPStatus

NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

def get_scale(root, scale_type):
    """Returns a scale given the root and type."""
    scales = {
        "major": [0, 2, 4, 5, 7, 9, 11],
        "natural minor": [0, 2, 3, 5, 7, 8, 10],
        "melodic minor": [0, 2, 3, 5, 7, 9, 11],  # Ascending melodic minor
    }
    scale_notes = []
    for interval in scales[scale_type]:
        scale_notes.append(NOTES[(NOTES.index(root) + interval) % 12])
    return scale_notes

def get_chords_from_scale(scale):
    """Generates triads and seventh chords from a scale."""
    triads = []
    sevenths = []

    for i in range(len(scale)):
        root = scale[i]
        third = scale[(i + 2) % len(scale)]
        fifth = scale[(i + 4) % len(scale)]
        triads.append([root, third, fifth])
        seventh = scale[(i + 6) % len(scale)]  # for 7th chords
        sevenths.append([root, third, fifth, seventh])
    return triads, sevenths

def get_chord_name_and_roman(chord, scale):
    root = chord[0]
    root_index = scale.index(root)
    roman_base = ["I", "II", "III", "IV", "V", "VI", "VII"][root_index]

    intervals = []
    root_index = NOTES.index(root)
    for note in chord[1:]:
        intervals.append((NOTES.index(note) - root_index) % len(NOTES))

    if intervals[:2] == [4, 7]:
        chord_type = ""  # Major chord
        roman = roman_base
    elif intervals[:2] == [3, 7]:
        chord_type = "m"  # Minor chord
        roman = roman_base.lower()
    elif intervals[:2] == [3, 6]:
        chord_type = "dim"  # Diminished chord
        roman = roman_base.lower() + "°"
    elif intervals[:2] == [4, 6]:
        chord_type = "aug"  # Augmented chord
        roman = roman_base.upper() + "+"
    else:
        chord_type = "?"  # Unrecognized chord type
        roman = "?"

    # sevenths
    # TODO: add 9,11,13 and sort at the end
    sevenths = intervals[2:]
    while sevenths:
        interval = sevenths.pop(0)
        if interval == 9:
            chord_type += "6"
            roman += "6"
        elif interval == 10:
            chord_type += "7"
            roman += "7"
        elif interval == 11:
            chord_type += "M7"
            roman += "M7"
    return {
        "chord": root + chord_type,
        "roman": roman,
        "notes": " ".join(chord)
    }

def generate_progression(root, scale_type, triads_count, sevenths_count, random_seed=None):
    if random_seed is not None:
        random.seed(random_seed)
    scale = get_scale(root, scale_type)
    triads, sevenths = get_chords_from_scale(scale)

    progression = []
    # take n triads
    for _ in range(triads_count):
        chord = random.choice(triads)
        progression.append(get_chord_name_and_roman(chord, scale))
    for _ in range(sevenths_count):
        chord = random.choice(sevenths)
        progression.append(get_chord_name_and_roman(chord, scale))
    random.shuffle(progression)
    return progression

def random_progression(root=None, scale_type=None, triads_count=4, sevenths_count=1, random_seed=None):
    # TODO: randomly return sharps or flats
    if random_seed is not None:
        random.seed(random_seed)
    if root is None:
        root = random.choice(NOTES)
    if scale_type is None:
        scale_type = random.choice([
            "major",
            "natural minor",
            #"melodic minor"
        ])
    return {
        "scale": f"{root} {scale_type}",
        "scale_notes": " ".join(get_scale(root, scale_type)),
        "progression": generate_progression(root, scale_type, triads_count, sevenths_count, random_seed)
    }

def handler(event, *args):
    return {
        "statusCode": HTTPStatus.OK.value,
        "headers": {
            "content-type": "application/json",
        },
        "body": json.dumps(random_progression(*event))
    }