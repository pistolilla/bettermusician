import random
import mido

def generate_jazzy_chord_progression(num_chords=4):
    """Generates a random jazzy chord progression."""
    roots = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    qualities = ["maj7", "min7", "7", "dim7", "hdim7", "min7b5", ""]
    progression = []
    for _ in range(num_chords):
        root = random.choice(roots)
        quality = random.choice(qualities)
        progression.append((root, quality))
    return progression

def chord_to_midi(chord):
    """Converts a chord string to MIDI notes.  Avoids mido.note_name_to_number."""
    print("chord", chord)
    note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]  # Note names within an octave
    root, quality = chord
    root_index = note_names.index(root.replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#").replace("Bb", "A#"))
    root_num = root_index + 60 # MIDI note number for C4 is 60
    # quality
    if quality == "maj7":
        return [root_num, root_num + 4, root_num + 7, root_num + 11]
    elif quality == "min7":
        return [root_num, root_num + 3, root_num + 7, root_num + 10]
    elif quality == "7":
        return [root_num, root_num + 4, root_num + 7, root_num + 10]
    elif quality == "dim7":
        return [root_num, root_num + 3, root_num + 6, root_num + 9]
    elif quality == "hdim7":
        return [root_num, root_num + 3, root_num + 6, root_num + 10]
    elif quality == "min7b5":
        return [root_num, root_num + 3, root_num + 6, root_num + 10]
    else:
        return [root_num]

def create_midi_file(progression, filename="jazzy_chords.mid"):
    """Creates a MIDI file from a chord progression."""
    midi = mido.MidiFile()
    track = mido.MidiTrack()
    midi.tracks.append(track)
    tempo = mido.bpm2tempo(120)
    track.append(mido.MetaMessage('set_tempo', tempo=tempo))

    for chord_name in progression:
        notes = chord_to_midi(chord_name)
        print("notes", notes)
        for note in notes:
            track.append(mido.Message('note_on', note=note, velocity=64, time=0))

        track.append(mido.Message('note_off', note=notes[0], velocity=64, time=480))
        for note in notes[1:]:
            track.append(mido.Message('note_off', note=note, velocity=64, time=0))

    midi.save(filename)




progression = generate_jazzy_chord_progression(6)
create_midi_file(progression)
print(f"MIDI file 'jazzy_chords.mid' created with progression: {progression}")
