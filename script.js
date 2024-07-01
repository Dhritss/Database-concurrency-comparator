document.getElementById('compareBtn').addEventListener('click', function() {
    var query1 = document.getElementById('query1').value.trim();
    var query2 = document.getElementById('query2').value.trim();

    if (query1 === '' || query2 === '') {
        alert('Please enter both SQL queries.');
        return;
    }

    // AJAX request to compare queries (you will need backend code for this)
    var url = 'compare.php'; // Example endpoint
    var params = {
        query1: query1,
        query2: query2
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response);
            } else {
                console.error('Error: ' + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(params));
});

function displayResults(results) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.error) {
        resultsDiv.innerHTML = '<p>Error: ' + results.error + '</p>';
    } else {
        var table = '<h2>Comparison Results</h2>';
        table += '<table>';
        table += '<tr><th>Query 1 Result</th><th>Query 2 Result</th></tr>';
        table += '<tr>';
        table += '<td>' + results.query1Result + '</td>';
        table += '<td>' + results.query2Result + '</td>';
        table += '</tr>';
        table += '</table>';
        resultsDiv.innerHTML = table;
    }
}
