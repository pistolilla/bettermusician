import random
import json
from http import HTTPStatus

from transitions import random_sequence

NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
NOTES_FLAT  = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

def get_scale(root, scale_type):
    """Returns a scale given the root and type."""
    if scale_type == "major":
        root = {"C#": "Db", "D#": "Eb", "Gb": "F#", "G#": "Ab", "A#": "Bb"}.get(root, root)
        if root in "C G D A E B".split() or "#" in root:
            notes = NOTES_SHARP
        else:
            notes = NOTES_FLAT
    elif scale_type in "minor,harmonic minor".split(","):
        root = {"Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "A#": "Bb"}.get(root, root)
        if root in "A E B".split() or "#" in root:
            notes = NOTES_SHARP
        else:
            notes = NOTES_FLAT

    scales = {
        "major": [0, 2, 4, 5, 7, 9, 11],
        "minor": [0, 2, 3, 5, 7, 8, 10],
        "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
    }
    scale_notes = []
    for interval in scales[scale_type]:
        scale_notes.append(notes[(notes.index(root) + interval) % 12])
    return root, scale_notes

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
    return {
        "triads": triads,
        "sevenths": sevenths
    }

def get_chord_name_and_roman(chord, scale):
    root = chord[0]
    if set(chord).issubset(set(NOTES_SHARP)):
        notes = NOTES_SHARP
    elif set(chord).issubset(set(NOTES_FLAT)):
        notes = NOTES_FLAT
    else:
        raise Exception(f"Notes: {notes} are not found on any scale")

    root_index = scale.index(root)
    roman_base = ["I", "II", "III", "IV", "V", "VI", "VII"][root_index]

    intervals = []
    root_index = notes.index(root)
    for note in chord[1:]:
        intervals.append((notes.index(note) - root_index) % len(notes))

    if intervals[:2] == [4, 7]:
        chord_type = ""  # Major chord
        roman = roman_base
    elif intervals[:2] == [3, 7]:
        chord_type = "m"  # Minor chord
        roman = roman_base.lower()
    elif intervals[:2] == [3, 6]:
        chord_type = "dim"  # Diminished chord
        roman = roman_base.lower() + "°"
    elif intervals[:2] == [4, 8]:
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
            if chord_type.endswith("dim"):
                chord_type += "7"
                roman += "7"
            else:
                chord_type += "6"
                roman += "6"
        elif interval == 10:
            # half diminished
            if chord_type.endswith("dim"):
                chord_type = chord_type.replace("dim", "m7b5")
                roman = roman.replace("°", "ø")
            else:
                chord_type += "7"
                roman += "7"
        elif interval == 11:
            chord_type += "maj7"
            roman += "∆"
    return {
        "chord": root + chord_type,
        "roman": roman,
        "notes": " ".join(chord)
    }

def generate_progression(root, scale_type, triads_count, sevenths_count, bars, random_seed):
    if random_seed is not None:
        random.seed(random_seed)
    _, scale = get_scale(root, scale_type)
    # fetching all possible triads and sevents
    pool = get_chords_from_scale(scale)
    # chord sequence is the same for all bars
    sequence = random_sequence(scale_type, triads_count + sevenths_count)
    result = []
    for _ in range(bars):
        # shuffling triads and sevenths order for each bar
        colors = ["triads"] * triads_count + ["sevenths"] * sevenths_count
        # creates different orders each time even with fixed random_seed
        random.shuffle(colors)
        progression = [get_chord_name_and_roman(pool[c][i], scale) for c, i in zip(colors, sequence)]
        result.append(progression)
    return result

def random_progression(root=None, scale_type=None, triads_count=4, sevenths_count=1, bars=1, random_seed=None):
    # TODO: randomly return sharps or flats
    if random_seed is not None:
        random.seed(random_seed)
    if root is None:
        root = random.choice(NOTES_SHARP + NOTES_FLAT)
    if scale_type is None:
        scale_type = random.choice([
            "major",
            "minor",
            "harmonic minor",
        ])
    root, scale_notes = get_scale(root, scale_type)
    progression_data = generate_progression(root, scale_type, triads_count, sevenths_count, bars, random_seed)
    text = ""
    for bar in progression_data:
        bar_text = "|".join([chord["chord"] for chord in bar])
        text += f"|{bar_text}|\n"

    return {
        "scale": f"{root} {scale_type}",
        "scale_notes": " ".join(scale_notes),
        "progression": progression_data,
        "text": text.strip() #remove trailing newline
    }

def handler(event, *args):
    return {
        "statusCode": HTTPStatus.OK.value,
        "headers": {
            "content-type": "application/json",
        },
        "body": json.dumps(random_progression(**event))
    }
