const base_url = "https://la3du2tlph.execute-api.us-east-1.amazonaws.com/prod";

function generate_progression() {
    // reading inputs
    var root = document.getElementById("root").value;
    var scale = document.getElementById("scale").value;
    var start = document.getElementById("start").value;
    var bars = document.getElementById("bars").value;
    var triads = document.getElementById("triads").value;
    var sevenths = document.getElementById("sevenths").value;
    // clear table
    var table = document.getElementById("displayTable");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    // api call
    axios({
        method: "POST",
        url: `${base_url}/progression/generate`,
        data: {
            "root": (root == "") ? null : root,
            "scale_type": (scale == "") ? null : scale,
            "start": (start == "") ? null : start,
            "bars": Number(bars),
            "triads_count": (triads == "") ? null : Number(triads),
            "sevenths_count": (sevenths == "") ? null : Number(sevenths)
        },
    })
    .then(function(response) {
        console.log(response.data);
        // populating table
        var title = document.getElementById("title");
        title.innerHTML = response.data.scale;
        var notes = document.getElementById("notes");
        notes.innerHTML = response.data.scale_notes;

        var table = document.getElementById("displayTable");
        response.data.progression.forEach(bar => {
            bar.forEach(item => {
                // highlighting the trailing seventh notation: 7, maj7, 7b5
                chord_html = item.chord.replace(/(7|maj7|7b5)$/g, '<span class="highlight">$1</span>');
                let row = table.insertRow();
                let chord = row.insertCell(0);
                chord.innerHTML = chord_html;
                let roman = row.insertCell(1);
                roman.innerHTML = item.roman;
                let notes = row.insertCell(2);
                notes.innerHTML = item.notes;
            });
            let row = table.insertRow();
            let separator = row.insertCell(0);
            separator.colSpan = 3;
            separator.innerHTML = '<hr class="my-1" />';
        });
        // populating text
        document.getElementById("mth").value = response.data.text;
    });
}
function initialize() {
    generate_progression();
}

// on load
initialize();
