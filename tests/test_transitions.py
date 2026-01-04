from lambdas.chord_progression.transitions import random_sequence

SAMPLE_SEEDS = [
    {
        "random_seed": 1,
        "scale_type": "major",
        "size": 4,
        "start": 1,
        "expected": [0, 2, 5, 1, 6]
    },
    {
        "random_seed": 1,
        "scale_type": "minor",
        "size": 5,
        "expected": [1, 6, 0, 3, 0, 4]
    },
    {
        "random_seed": 1,
        "scale_type": "harmonic minor",
        "size": 5,
        "expected": [1, 4, 5, 1, 6, 4]
    },
]
def test_random_sequence():
    for sample in SAMPLE_SEEDS:
        expected = sample.pop("expected")
        result = random_sequence(**sample)
        print(result)
        assert result == expected
