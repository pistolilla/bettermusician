const base_url = "https://la3du2tlph.execute-api.us-east-1.amazonaws.com/prod";

function generate_progression() {
    // api call
    axios({
        method: "POST",
        url: `${base_url}/progression/generate`,
        data: {},
    })
    .then(function(response) {
        console.log(response.data);
        var title = document.getElementById("title");
        title.innerHTML = response.data.scale;
        var notes = document.getElementById("notes");
        notes.innerHTML = response.data.scale_notes;

        var table = document.getElementById("displayTable");
        response.data.progression.forEach(item => {
            let row = table.insertRow();
            let chord = row.insertCell(0);
            chord.innerHTML = item.chord;
            let roman = row.insertCell(1);
            roman.innerHTML = item.roman;
            let notes = row.insertCell(2);
            notes.innerHTML = item.notes;
        });
    });
}
function initialize() {
    generate_progression();
}

// on load
initialize();
