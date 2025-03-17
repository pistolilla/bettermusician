window.translation = {
  button_names: {
    show_key_signature: "Show key signatures",
    hide_key_signature: "Hide key signatures",
    clef: {
      default_name: "Clef",
      treble: "Treble clef",
      bass: "Bass clef",
      alto: "Alto clef",
      tenor: "Tenor clef"
    },
    pdf_button_text: "Save as PDF",
  },
  major: [
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "G<tspan class='--accidentals'>¨</tspan>/F<tspan class='--accidentals'>©</tspan>",
    "D<tspan class='--accidentals'>¨</tspan>",
    "A<tspan class='--accidentals'>¨</tspan>",
    "E<tspan class='--accidentals'>¨</tspan>",
    "B<tspan class='--accidentals'>¨</tspan>",
    "F"
  ],
  minor: [
    "Am",
    "Em",
    "Bm",
    "F<tspan class='--accidentals'>©</tspan>m",
    "C<tspan class='--accidentals'>©</tspan>m",
    "G<tspan class='--accidentals'>©</tspan>m",
    "<tspan y='-3'>E<tspan class='--accidentals'>¨</tspan>m</tspan><tspan x='0' y='5'>D<tspan class='--accidentals'>©</tspan>m</tspan>",
    "B<tspan class='--accidentals'>¨</tspan>m",
    "Fm",
    "Cm",
    "Gm",
    "Dm"
  ],
  PDF: {
    // development option: if enabled PDF document can be seen on the page
    display_pdf: false,
    heading_text: "Circle of fifths",
    // path to the image, should be added to the circle-of-fifths root folder
    //logo: "musicca-large.png",
    // path to the font with the special symbols for example Japanese.
    // Font should be uploaded to /files/scripts/circle-of-fifths/media/ or any other preferable directory
    // if an app isn't required special font, you can leave object values as an empty strings: family: "", format: "", src: "",
    heading_font: {
      family: "",
      format: "",
      src: "",
    },
    // fontFamily: "Noto Sans" - attaches special font to the heading, fontFamily: "..." entry can be removed if no special font is required
    heading_style: {
      textAlign: "center",
      color: "#555",
      fontSize: 50,
      padding: "70 0 40 0",
    },
    // sets CSS for all keys for chosen circle.v
    major_font_style: {
    },
    minor_font_style: {
      fontSize: 7
    },
    // If you need to set up a unique CSS for each key individually
    // you can set it for example for wrapping tag <g style='font-size: 3px'>..., <span style='font-size: 3px'
    major: [
      "<text>C</text>",
      "<text>G</text>",
      "<text>D</text>",
      "<text>A</text>",
      "<text>E</text>",
      "<text>B</text>",
      "<g>" +
      "<text x='-8'>G</text>" +
      "<text x='-2' class='accidentals'>¨</text>" +
      "<text x='5'>/F</text>" +
      "<text x='11.5' class='accidentals'>©</text>" +
      "</g>",
      "<g><text x='-4'>D</text><text x='2' class='accidentals'>¨</text></g>",
      "<g><text x='-4'>A</text><text x='2' class='accidentals'>¨</text></g>",
      "<g><text x='-4'>E</text><text x='1' class='accidentals'>¨</text></g>",
      "<g><text x='-4'>B</text><text x='1.5' class='accidentals'>¨</text></g>",
      "<text>F</text>"
    ],
    minor: [
      "<g><text>Am</text></g>",
      "<g><text>Em</text></g>",
      "<g><text>Bm</text></g>",
      "<g>" +
      "<text x='-4'>F</text>" +
      "<text x='-0.5' class='accidentals'>©</text>" +
      "<text x='4.5'>m</text>" +
      "</g>",
      "<g>" +
      "<text x='-3.5'>C</text>" +
      "<text x='0.5' class='accidentals'>©</text>" +
      "<text x='5.5'>m</text>" +
      "</g>",
      "<g>" +
      "<text x='-3'>G</text>" +
      "<text x='1' class='accidentals'>©</text>" +
      "<text x='6'>m</text>" +
      "</g>",
      "<span>" +
      "<g y='-4'>" +
      "<text x='-4'>E</text>" +
      "<text x='-0.5' class='accidentals'>¨</text>" +
      "<text x='4.5'>m</text>" +
      "</g>" +
      "<g y='4'>" +
      "<text x='-4'>D</text>" +
      "<text class='accidentals'>©</text>" +
      "<text x='5'>m</text>" +
      "</g>" +
      "</span>",
      "<g>" +
      "<text x='-5'>B</text>" +
      "<text x='-1' class='accidentals'>¨</text>" +
      "<text x='4'>m</text>" +
      "</g>",
      "<g><text>Fm</text></g>",
      "<g><text>Cm</text></g>",
      "<g><text>Gm</text></g>",
      "<g><text>Dm</text></g>",
    ],
  },
  functional_harmony: {
    text: {
      key: "Key:",
      relative_key: "Relative key:",
      parallel_key: "Parallel key:",
      chords_in: "Chords in"
    },
    modes_row: {
      major: ["tonic", "supertonic", "mediant", "subdominant", "dominant", "submediant", "leading tone"],
      minor: ["tonic", "supertonic", "mediant", "subdominant", "dominant", "submediant", "subtonic"]
    },
    major: [
      {
        key: "C major",
        relative_key: "A minor",
        parallel_key: "C minor",
        harmony: ["C", "Dm", "Em", "F", "G", "Am", "B°"]
      },
      {
        key: "G major",
        relative_key: "E minor",
        parallel_key: "G minor",
        harmony: ["G", "Am", "Bm", "C", "D", "Em", "F<span>©</span>°"],
      },
      {
        key: "D major",
        relative_key: "B minor",
        parallel_key: "D minor",
        harmony: ["D", "Em", "F<span>©</span>m", "G", "A", "Bm", "C<span>©</span>°"],
      },
      {
        key: "A major",
        relative_key: "F-sharp minor",
        parallel_key: "A minor",
        harmony: ["A", "Bm", "C<span>©</span>m", "D", "E", "F<span>©</span>m", "G<span>©</span>°"]
      },
      {
        key: "E major",
        relative_key: "C-sharp minor",
        parallel_key: "E minor",
        harmony: ["E", "F<span>©</span>m", "G<span>©</span>m", "A", "B", "C<span>©</span>m", "D<span>©</span>°"]
      },
      {
        key: "B major",
        relative_key: "G-sharp minor",
        parallel_key: "B minor",
        harmony: ["B", "C<span>©</span>m", "D<span>©</span>m", "E", "F<span>©</span>", "G<span>©</span>m", "A<span>©</span>°"]
      },
      {
        key: "F-sharp major",
        relative_key: "D-sharp minor",
        parallel_key: "F-sharp minor",
        harmony: ["F<span>©</span>", "G<span>©</span>m", "A<span>©</span>m", "B", "C<span>©</span>", "D<span>©</span>m", "E<span>©</span>°"]
      },
      {
        key: "D-flat major",
        relative_key: "B-flat minor",
        parallel_key: "D-flat minor",
        harmony: ["D<span>¨</span>", "E<span>¨</span>m", "Fm", "G<span>¨</span>", "A<span>¨</span>", "B<span>¨</span>m", "C°"]
      },
      {
        key: "A-flat major",
        relative_key: "F minor",
        parallel_key: "A-flat minor",
        harmony: ["A<span>¨</span>", "B<span>¨</span>m", "Cm", "D<span>¨</span>", "E<span>¨</span>", "Fm", "G°"]
      },
      {
        key: "E-flat major",
        relative_key: "C minor",
        parallel_key: "E-flat minor",
        harmony: ["E<span>¨</span>", "Fm", "Gm", "A<span>¨</span>", "B<span>¨</span>", "Cm", "D°"]
      },
      {
        key: "B-flat major",
        relative_key: "G minor",
        parallel_key: "B-flat minor",
        harmony: ["B<span>¨</span>", "Cm", "Dm", "E<span>¨</span>", "F", "Gm", "A°"]
      },
      {
        key: "F major",
        relative_key: "D minor",
        parallel_key: "F minor",
        harmony: ["F", "Gm", "Am", "B<span>¨</span>", "C", "Dm", "E°"]
      },
    ],
    minor: [
      {
        key: "A minor",
        relative_key: "C major",
        parallel_key: "A major",
        harmony: ["Am", "B°", "C", "Dm", "Em", "F", "G"]
      },
      {
        key: "E minor",
        relative_key: "G major",
        parallel_key: "E major",
        harmony: ["Em", "F<span>©</span>°", "G", "Am", "Bm", "C", "D"]
      },
      {
        key: "B minor",
        relative_key: "D major",
        parallel_key: "B major",
        harmony: ["Bm", "C<span>©</span>°", "D", "Em", "F<span>©</span>m", "G", "A"]
      },
      {
        key: "F-sharp minor",
        relative_key: "A major",
        parallel_key: "F-sharp major",
        harmony: ["F<span>©</span>m", "G<span>©</span>°", "A", "Bm", "C<span>©</span>m", "D", "E"]
      },
      {
        key: "C-sharp minor",
        relative_key: "E major",
        parallel_key: "C-sharp major",
        harmony: ["C<span>©</span>m", "D<span>©</span>°", "E", "F<span>©</span>m", "G<span>©</span>m", "A", "B"]
      },
      {
        key: "G-sharp minor",
        relative_key: "B major",
        parallel_key: "G-sharp major",
        harmony: ["G<span>©</span>m", "A<span>©</span>°", "B", "C<span>©</span>m", "D<span>©</span>m", "E", "F<span>©</span>"]
      },
      {
        key: "D-sharp minor",
        relative_key: "F-sharp major",
        parallel_key: "D-sharp major",
        harmony: ["D<span>©</span>m", "E<span>©</span>°", "F<span>©</span>", "G<span>©</span>m", "A<span>©</span>m", "B", "C<span>©</span>"]
      },
      {
        key: "B-flat minor",
        relative_key: "D-flat major",
        parallel_key: "B-flat major",
        harmony: ["B<span>¨</span>m", "C°", "D<span>¨</span>", "E<span>¨</span>m", "Fm", "G<span>¨</span>", "A<span>¨</span>"]
      },
      {
        key: "F minor",
        relative_key: "A-flat major",
        parallel_key: "F major",
        harmony: ["Fm", "G°", "A<span>¨</span>", "B<span>¨</span>m", "Cm", "D<span>¨</span>", "E<span>¨</span>"]
      },
      {
        key: "C minor",
        relative_key: "E-flat major",
        parallel_key: "C major",
        harmony: ["Cm", "D°", "E<span>¨</span>", "Fm", "Gm", "A<span>¨</span>", "B<span>¨</span>"]
      },
      {
        key: "G minor",
        relative_key: "B-flat major",
        parallel_key: "G major",
        harmony: ["Gm", "A°", "B<span>¨</span>", "Cm", "Dm", "E<span>¨</span>", "F"]
      },
      {
        key: "D minor",
        relative_key: "F major",
        parallel_key: "D major",
        harmony: ["Dm", "E°", "F", "Gm", "Am", "B<span>¨</span>", "C"]
      },
    ]
  }
}
