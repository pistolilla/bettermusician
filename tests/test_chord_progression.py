import random
from lambdas.chord_progression.handler import get_scale, get_chords_from_scale, generate_progression, get_chord_name_and_roman, random_progression

SAMPLE_SCALES = [
    {
        "root": "C",
        "scale_type": "major",
        "expected": ["C", "D", "E", "F", "G", "A", "B"]
    },
    {
        "root": "B",
        "scale_type": "natural minor",
        "expected": ["B", "C#", "D", "E", "F#", "G", "A"]
    },
]
def test_get_scale():
    for sample in SAMPLE_SCALES:
        expected = sample.pop("expected")
        assert get_scale(**sample) == expected

SAMPLE_CHORDS = [
    {
        "scale": ["C", "D", "E", "F", "G", "A", "B"],
        "expected": (
            # triads
            [["C", "E", "G"], ["D", "F", "A"], ["E", "G", "B"], ["F", "A", "C"], ["G", "B", "D"], ["A", "C", "E"], ["B", "D", "F"]],
            # sevenths
            [["C", "E", "G", "B"], ["D", "F", "A", "C"], ["E", "G", "B", "D"], ["F", "A", "C", "E"], ["G", "B", "D", "F"], ["A", "C", "E", "G"], ["B", "D", "F", "A"]]
        )
    },
    {
        "scale": ["B", "C#", "D", "E", "F#", "G", "A"],
        "expected": (
            # triads
            [["B", "D", "F#"], ["C#", "E", "G"], ["D", "F#", "A"], ["E", "G", "B"], ["F#", "A", "C#"], ["G", "B", "D"], ["A", "C#", "E"]],
            # sevenths
            [["B", "D", "F#", "A"], ["C#", "E", "G", "B"], ["D", "F#", "A", "C#"], ["E", "G", "B", "D"], ["F#", "A", "C#", "E"], ["G", "B", "D", "F#"], ["A", "C#", "E", "G"]]
        )
    },
]
def test_get_chords_from_scale():
    for sample in SAMPLE_CHORDS:
        expected = sample.pop("expected")
        result = get_chords_from_scale(**sample)
        print(result)
        assert result == expected

SAMPLE_CHORD_NAMES = [
    # C major
    {
        "chord": ["C", "E", "G"],
        "scale": ["C", "D", "E", "F", "G", "A", "B"],
        "expected": {
            "chord": "C",
            "roman": "I",
            "notes": "C E G"
        }
    },
    {
        "chord": ["C", "E", "G", "B"],
        "scale": ["C", "D", "E", "F", "G", "A", "B"],
        "expected": {
            "chord": "CM7",
            "roman": "IM7",
            "notes": "C E G B"
        }
    },
    {
        "chord": ["A", "C", "E"],
        "scale": ["C", "D", "E", "F", "G", "A", "B"],
        "expected": {
            "chord": "Am",
            "roman": "vi",
            "notes": "A C E"
        }
    },
    # E natural minor
    {
        "chord": ["F#", "A", "C"],
        "scale": ["E", "F#", "G", "A", "Bb", "C", "D"],
        "expected": {
            "chord": "F#dim",
            "roman": "ii°",
            "notes": "F# A C"
        }
    },
    # G natural minor
    {
        "chord": ["D", "F", "A"],
        "scale": ["G", "A", "A#", "C", "D", "D#", "F"],
        "expected": {
            "chord": "Dm",
            "roman": "v",
            "notes": "D F A"
        }
    },
]
def test_get_chord_name_and_roman():
    for sample in SAMPLE_CHORD_NAMES:
        expected = sample.pop("expected")
        result = get_chord_name_and_roman(**sample)
        assert result == expected

SAMPLE_GENERATED_PROGRESSIONS = [
    {
        "random_seed": 42,
        "root": "C",
        "scale_type": "major",
        "triads_count": 4,
        "sevenths_count": 1,
        "expected": [
            {"chord": "Am", "roman": "vi", "notes": "A C E"},
            {"chord": "C", "roman": "I", "notes": "C E G"},
            {"chord": "Am", "roman": "vi", "notes": "A C E"},
            {"chord": "Em7", "roman": "iii7", "notes": "E G B D"},
            {"chord": "C", "roman": "I", "notes": "C E G"}
        ]
    },
    {
        "random_seed": 42,
        "root": "G#",
        "scale_type": "natural minor",
        "triads_count": 1,
        "sevenths_count": 3,
        "expected": [
            {"chord": "G#m7", "roman": "i7", "notes": "G# B D# F#"},
            {"chord": "EM7", "roman": "VIM7", "notes": "E G# B D#"},
            {"chord": "E", "roman": "VI", "notes": "E G# B"},
            {"chord": "G#m7", "roman": "i7", "notes": "G# B D# F#"}
        ]
    },
    {
        "random_seed": 1,
        "root": "D#",
        "scale_type": "natural minor",
        "triads_count": 1,
        "sevenths_count": 0,
        "expected": [
            {"chord": "Fdim", "roman": "ii°", "notes": "F G# B"}
        ]
    },
]
def test_generate_progression():
    for sample in SAMPLE_GENERATED_PROGRESSIONS:
        expected = sample.pop("expected")
        result = generate_progression(**sample)
        print(result)
        assert result == expected

SAMPLE_RANDOM_SEEDS = [
    {
        "random_seed": 1,
        "triads_count": 1,
        "sevenths_count": 2,
        "expected": {
            "scale": "D major",
            "scale_notes": "D E F# G A B C#",
            "progression": [
                {"chord": "C#dim7", "roman": "vii°7", "notes": "C# E G B"},
                {"chord": "A7", "roman": "V7", "notes": "A C# E G"},
                {"chord": "Em", "roman": "ii", "notes": "E G B"}
            ]
        }
    },
]
def test_random_progression():
    for sample in SAMPLE_RANDOM_SEEDS:
        expected = sample.pop("expected")
        result = random_progression(**sample)
        print(result)
        assert result == expected
