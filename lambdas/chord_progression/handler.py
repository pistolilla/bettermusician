import random
import json
from http import HTTPStatus

def get_scale(root, scale_type):
    """Returns a scale given the root and type."""
    scales = {
        "major": [0, 2, 4, 5, 7, 9, 11],
        "natural minor": [0, 2, 3, 5, 7, 8, 10],
        "melodic minor": [0, 2, 3, 5, 7, 9, 11],  # Ascending melodic minor
    }
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    scale_notes = []
    for interval in scales[scale_type]:
        scale_notes.append(notes[(notes.index(root) + interval) % 12])
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

def generate_progression(root, scale_type):
    scale = get_scale(root, scale_type)
    triads, sevenths = get_chords_from_scale(scale)

    progression = []
    roman_numerals = []  # Initialize here
    chord_names = []

    for _ in range(4):
        triad = random.choice(triads)
        progression.append(triad)
        name, roman = get_chord_name_and_roman(triad, scale, scale_type)
        chord_names.append(name)
        roman_numerals.append(roman)

    seventh = random.choice(sevenths)
    progression.append(seventh)
    name, roman = get_chord_name_and_roman(seventh, scale, scale_type, seventh=True)  # Indicate 7th chord
    chord_names.append(name)
    roman_numerals.append(roman)

    random.shuffle(progression)
    # Don't shuffle roman numerals and names separately; they need to stay aligned.
    combined = list(zip(progression, chord_names, roman_numerals))
    random.shuffle(combined)
    progression, chord_names, roman_numerals = zip(*combined)

    return scale, list(progression), list(chord_names), list(roman_numerals)  # Convert tuples back to lists

def get_chord_name_and_roman(chord, scale, scale_type, seventh=False):
    root = chord[0]
    root_index = scale.index(root)
    roman_base = ["I", "II", "III", "IV", "V", "VI", "VII"][root_index]

    intervals = []
    for note in chord[1:]:
        intervals.append((scale.index(note) - root_index) % len(scale)) #always positive

    if seventh:
        chord_type ="7" # For now, all sevenths are dominant 7ths
    elif intervals == [2,4] or intervals == [3, 5]: # Minor third, Perfect Fifth
        chord_type = "min"
    elif intervals == [2, 5]: #Minor third, tritone
        chord_type = "dim"
    elif intervals == [3,4]: # Major Third, Perfect Fifth
        chord_type = "" # Major chord (no suffix)
    elif intervals == [4,5]: # Augmented Chord
        chord_type = "aug"
    else:
        chord_type = "?"  # Unrecognized chord type

    chord_name = root + chord_type
    if seventh: # A dominant 7 chord is always represented with a major roman numeral. So we do this check after setting chord_type
        roman = roman_base.upper() + "7"
    elif chord_type == "min":
        roman = roman_base.lower()
    elif chord_type == "dim":
        roman = roman_base.lower() + "°"
    elif chord_type == "aug":
        roman = roman_base.upper() + "+"
    else:  # Major chord
        roman = roman_base.upper()

    return chord_name, roman

def random_progression(root=None, scale_type=None):
    # TODO: randomly return sharps or flats
    if root is None:
        root = random.choice(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"])
    if scale_type is None:
        scale_type = random.choice([
            "major",
            "natural minor",
            #"melodic minor"
        ])
    scale, progression, chord_names, roman_progression = generate_progression(root, scale_type)
    sequence = []
    for i, chord in enumerate(chord_names):
        sequence.append({
            "chord": chord,
            "roman": roman_progression[i],
            "notes": " ".join(progression[i])
        })
    return {
        "scale": f"{root} {scale_type}",
        "scale_notes": " ".join(scale),
        "progression": sequence
    }

def handler(event, *args):
    return {
        "statusCode": HTTPStatus.OK.value,
        "headers": {
            "content-type": "application/json",
        },
        "body": json.dumps(random_progression(*event))
    }