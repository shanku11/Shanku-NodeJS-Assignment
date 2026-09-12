const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Helper function to convert users.txt content to an HTML table
function convertTxtToTable(data) {
    const lines = data
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (lines.length === 0) {
        return '<table></table>';
    }

    let html = '<table>\n';

    // First line contains table headers
    const headerCols = lines[0].split('|').map(col => col.trim());
    html += '    <tr>\n';
    headerCols.forEach(col => {
        html += `       <th>${col}</th>\n`;
    });
    html += '    </tr>\n';

    // Subsequent lines contain table data rows
    for (let i = 1; i < lines.length; i++) {
        const rowCols = lines[i].split('|').map(col => col.trim());
        html += '    <tr>\n';
        rowCols.forEach(col => {
            html += `       <td>${col}</td>\n`;
        });
        html += '    </tr>\n';
    }

    html += '</table>';
    return html;
}

// Endpoint for Exercise 2
app.get(['/api/exercise2', '/api/exercise2/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'users.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.txt:', err);
            return res.status(500).type('text/html').send('<p>Error reading users file</p>');
        }

        const tableHtml = convertTxtToTable(data);
        res.status(200).type('text/html').send(tableHtml);
    });
});

// Start the server if executed directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Exercise 2 Server is listening on port ${PORT}`);
        console.log(`Endpoint: http://localhost:${PORT}/api/exercise2`);
    });
}

module.exports = app;
module.exports.convertTxtToTable = convertTxtToTable;
