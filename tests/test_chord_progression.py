import random
from lambdas.chord_progression.handler import get_scale, get_chords_from_scale, generate_progression, get_chord_name_and_roman, random_progression

SAMPLE_SCALES = [
    {
        "root": "C",
        "scale_type": "major",
        "expected": ("C", ["C", "D", "E", "F", "G", "A", "B"])
    },
    {
        "root": "B",
        "scale_type": "minor",
        "expected": ("B", ["B", "C#", "D", "E", "F#", "G", "A"])
    },
    {
        "root": "B",
        "scale_type": "major",
        "expected": ("B", ["B", "C#", "D#", "E", "F#", "G#", "A#"])
    },
    # C# major -> Db major
    {
        "root": "C#",
        "scale_type": "major",
        "expected": ("Db", ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"])
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
    # B minor
    {
        "scale": ["B", "C#", "D", "E", "F#", "G", "A"],
        "expected": (
            # triads
            [["B", "D", "F#"], ["C#", "E", "G"], ["D", "F#", "A"], ["E", "G", "B"], ["F#", "A", "C#"], ["G", "B", "D"], ["A", "C#", "E"]],
            # sevenths
            [["B", "D", "F#", "A"], ["C#", "E", "G", "B"], ["D", "F#", "A", "C#"], ["E", "G", "B", "D"], ["F#", "A", "C#", "E"], ["G", "B", "D", "F#"], ["A", "C#", "E", "G"]]
        )
    },
    # B harmonic minor
    {
        "scale": ["B", "C#", "D", "E", "F#", "G", "A#"],
        "expected": (
            # triads
            [["B", "D", "F#"], ["C#", "E", "G"], ["D", "F#", "A#"], ["E", "G", "B"], ["F#", "A#", "C#"], ["G", "B", "D"], ["A#", "C#", "E"]],
            # sevenths
            [["B", "D", "F#", "A#"], ["C#", "E", "G", "B"], ["D", "F#", "A#", "C#"], ["E", "G", "B", "D"], ["F#", "A#", "C#", "E"], ["G", "B", "D", "F#"], ["A#", "C#", "E", "G"]]
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
    # E minor
    {
        "chord": ["F#", "A", "C"],
        "scale": ["E", "F#", "G", "A", "Bb", "C", "D"],
        "expected": {
            "chord": "F#dim",
            "roman": "ii°",
            "notes": "F# A C"
        }
    },
    # G minor
    {
        "chord": ["D", "F", "A"],
        "scale": ["G", "A", "A#", "C", "D", "D#", "F"],
        "expected": {
            "chord": "Dm",
            "roman": "v",
            "notes": "D F A"
        }
    },
    # A# minor
    {
        "chord": ["C", "D#", "F#", "A#"], # half diminished
        "scale": ["A#", "C", "C#", "D#", "F", "F#", "G#"],
        "expected": {
            "chord": "Cm7b5",
            "roman": "iiø",
            "notes": "C D# F# A#"
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
        "scale_type": "minor",
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
        "scale_type": "minor",
        "triads_count": 1,
        "sevenths_count": 0,
        "expected": [
            {"chord": "Fdim", "roman": "ii°", "notes": "F G# B"}
        ]
    },
    # A# minor -> Bb minor
    {
        "random_seed": 1,
        "root": "A#",
        "scale_type": "minor",
        "triads_count": 1,
        "sevenths_count": 0,
        "expected": [
            {"chord": "Cdim", "notes": "C Eb Gb", "roman": "ii°"}
        ]
    },
    {
        "random_seed": 42,
        "root": "B",
        "scale_type": "harmonic minor",
        "triads_count": 4,
        "sevenths_count": 5,
        "expected": [
            {"chord": "C#m7b5", "roman": "iiø", "notes": "C# E G B"},
            {"chord": "Bm", "roman": "i", "notes": "B D F#"},
            {"chord": "C#m7b5", "roman": "iiø", "notes": "C# E G B"},
            {"chord": "C#m7b5", "roman": "iiø", "notes": "C# E G B"},
            {"chord": "G", "roman": "VI", "notes": "G B D"},
            {"chord": "G", "roman": "VI", "notes": "G B D"},
            {"chord": "DaugM7", "roman": "III+M7", "notes": "D F# A# C#"},
            {"chord": "GM7", "roman": "VIM7", "notes": "G B D F#"},
            {"chord": "Bm", "roman": "i", "notes": "B D F#"}
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
        "random_seed": 4,
        "triads_count": 1,
        "sevenths_count": 2,
        "expected": {
            "scale": "G minor",
            "scale_notes": "G A Bb C D Eb F",
            "progression": [
                {"chord": "Adim", "notes": "A C Eb", "roman": "ii°"},
                {"chord": "BbM7", "notes": "Bb D F A", "roman": "IIIM7"},
                {"chord": "Gm7", "notes": "G Bb D F", "roman": "i7"}
            ]
        }
    },
    # Gb major -> F# major
    {
        "root": "Gb",
        "scale_type": "major",
        "triads_count": 1,
        "sevenths_count": 0,
        "expected": {
            "scale": "F# major",
            "scale_notes": "F# G# A# B C# D# F",
            "progression": [
                {"chord": "B", "roman": "IV", "notes": "B D# F#"}
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
