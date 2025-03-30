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
        "expected": {
            "triads": [["C", "E", "G"], ["D", "F", "A"], ["E", "G", "B"], ["F", "A", "C"], ["G", "B", "D"], ["A", "C", "E"], ["B", "D", "F"]],
            "sevenths": [["C", "E", "G", "B"], ["D", "F", "A", "C"], ["E", "G", "B", "D"], ["F", "A", "C", "E"], ["G", "B", "D", "F"], ["A", "C", "E", "G"], ["B", "D", "F", "A"]]
        }
    },
    # B minor
    {
        "scale": ["B", "C#", "D", "E", "F#", "G", "A"],
        "expected": {
            "triads": [["B", "D", "F#"], ["C#", "E", "G"], ["D", "F#", "A"], ["E", "G", "B"], ["F#", "A", "C#"], ["G", "B", "D"], ["A", "C#", "E"]],
            "sevenths": [["B", "D", "F#", "A"], ["C#", "E", "G", "B"], ["D", "F#", "A", "C#"], ["E", "G", "B", "D"], ["F#", "A", "C#", "E"], ["G", "B", "D", "F#"], ["A", "C#", "E", "G"]]
        }
    },
    # B harmonic minor
    {
        "scale": ["B", "C#", "D", "E", "F#", "G", "A#"],
        "expected": {
            "triads": [["B", "D", "F#"], ["C#", "E", "G"], ["D", "F#", "A#"], ["E", "G", "B"], ["F#", "A#", "C#"], ["G", "B", "D"], ["A#", "C#", "E"]],
            "sevenths": [["B", "D", "F#", "A#"], ["C#", "E", "G", "B"], ["D", "F#", "A#", "C#"], ["E", "G", "B", "D"], ["F#", "A#", "C#", "E"], ["G", "B", "D", "F#"], ["A#", "C#", "E", "G"]]
        }
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
            "chord": "Cmaj7",
            "roman": "I∆",
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
    # A harmonic minor
    {
        "chord": ["G#", "B", "D", "F"], # fully diminished
        "scale": ["A", "B", "C", "D", "E", "F", "G#"],
        "expected": {
            "chord": "G#dim7",
            "roman": "vii°7",
            "notes": "G# B D F"
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
        "bars": 1,
        "expected": [
            [
                {"chord": "Am", "roman": "vi", "notes": "A C E"},
                {"chord": "Dm", "roman": "ii", "notes": "D F A"},
                {"chord": "G", "roman": "V", "notes": "G B D"},
                {"chord": "Bm7b5", "roman": "viiø", "notes": "B D F A"},
                {"chord": "G", "roman": "V", "notes": "G B D"}
            ]
        ]
    },
    {
        "random_seed": 42,
        "root": "G#",
        "scale_type": "minor",
        "triads_count": 1,
        "sevenths_count": 3,
        "bars": 1,
        "expected": [
            [
                {"chord": "Emaj7", "roman": "VI∆", "notes": "E G# B D#"},
                {"chord": "G#m7", "roman": "i7", "notes": "G# B D# F#"},
                {"chord": "A#dim", "roman": "ii°", "notes": "A# C# E"},
                {"chord": "F#7", "roman": "VII7", "notes": "F# A# C# E"}
            ]
        ]
    },
    {
        "random_seed": 1,
        "root": "D#",
        "scale_type": "minor",
        "triads_count": 1,
        "sevenths_count": 0,
        "bars": 1,
        "expected": [
            [
                {"chord": "Fdim", "roman": "ii°", "notes": "F G# B"}
            ]
        ]
    },
    # A# minor -> Bb minor
    {
        "random_seed": 1,
        "root": "A#",
        "scale_type": "minor",
        "triads_count": 1,
        "sevenths_count": 1,
        "bars": 2,
        "expected": [
            [
                {"chord": "Cdim", "roman": "ii°", "notes": "C Eb Gb"},
                {"chord": "Ab7", "roman": "VII7", "notes": "Ab C Eb Gb"}
            ],
            [
                {"chord": "Cm7b5", "roman": "iiø", "notes": "C Eb Gb Bb"},
                {"chord": "Ab", "roman": "VII", "notes": "Ab C Eb"}
            ]
        ]
    },
    {
        "random_seed": 42,
        "root": "B",
        "scale_type": "harmonic minor",
        "triads_count": 4,
        "sevenths_count": 5,
        "bars": 1,
        "expected": [
            [
                {"chord": "Gmaj7", "roman": "VI∆", "notes": "G B D F#"},
                {"chord": "C#dim", "roman": "ii°", "notes": "C# E G"},
                {"chord": "F#7", "roman": "V7", "notes": "F# A# C# E"},
                {"chord": "A#dim7", "roman": "vii°7", "notes": "A# C# E G"},
                {"chord": "F#", "roman": "V", "notes": "F# A# C#"},
                {"chord": "Bm", "roman": "i", "notes": "B D F#"},
                {"chord": "Daugmaj7", "roman": "III+∆", "notes": "D F# A# C#"},
                {"chord": "C#dim", "roman": "ii°", "notes": "C# E G"},
                {"chord": "F#7", "roman": "V7", "notes": "F# A# C# E"}
            ]
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
                [
                    {"chord": "Adim", "roman": "ii°", "notes": "A C Eb"},
                    {"chord": "Dm7", "roman": "v7", "notes": "D F A C"},
                    {"chord": "Gm7", "roman": "i7", "notes": "G Bb D F"}
                ]
            ]
        }
    },
    # Gb major -> F# major
    {
        "random_seed": 1,
        "root": "Gb",
        "scale_type": "major",
        "bars": 3,
        "triads_count": 3,
        "sevenths_count": 1,
        "expected": {
            "scale": "F# major",
            "scale_notes": "F# G# A# B C# D# F",
            "progression": [
                [
                    {"chord": "G#m", "roman": "ii", "notes": "G# B D#"},
                    {"chord": "C#", "roman": "V", "notes": "C# F G#"},
                    {"chord": "D#m", "roman": "vi", "notes": "D# F# A#"},
                    {"chord": "G#m7", "roman": "ii7", "notes": "G# B D# F#"}
                ],
                [
                    {"chord": "G#m", "roman": "ii", "notes": "G# B D#"},
                    {"chord": "C#7", "roman": "V7", "notes": "C# F G# B"},
                    {"chord": "D#m", "roman": "vi", "notes": "D# F# A#"},
                    {"chord": "G#m", "roman": "ii", "notes": "G# B D#"}
                ],
                [
                    {"chord": "G#m7", "roman": "ii7", "notes": "G# B D# F#"},
                    {"chord": "C#", "roman": "V", "notes": "C# F G#"},
                    {"chord": "D#m", "roman": "vi", "notes": "D# F# A#"},
                    {"chord": "G#m", "roman": "ii", "notes": "G# B D#"}
                ]
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
