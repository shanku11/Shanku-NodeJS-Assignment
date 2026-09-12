/**
 * Unified Server for NodeJS Assignment 2
 * 
 * Combines all endpoints from Exercise 1, 2, 3, and 4 onto a single server.
 * This allows deploying to hosting platforms (Render, Railway, Vercel, etc.)
 * or exposing via Ngrok so that all endpoints can be accessed under one Base URL.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Helper function to convert users.txt content to an HTML table (from Exercise 2)
function convertTxtToTable(data) {
    const lines = data
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (lines.length === 0) {
        return '<table></table>';
    }

    let html = '<table>\n';
    const headerCols = lines[0].split('|').map(col => col.trim());
    html += '    <tr>\n';
    headerCols.forEach(col => {
        html += `       <th>${col}</th>\n`;
    });
    html += '    </tr>\n';

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

// -------------------------------------------------------------
// Exercise 1: Return lib/index.html on /api/exercise1
// -------------------------------------------------------------
app.get(['/api/exercise1', '/api/exercise1/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'index.html');
    res.status(200).type('text/html').sendFile(filePath);
});

// -------------------------------------------------------------
// Exercise 2: Return HTML table from users.txt on /api/exercise2
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// Exercise 3: Routes for home, about, and contact under lib/
// -------------------------------------------------------------
app.get(['/api/exercise3/pages/home', '/api/exercise3/pages/home/'], (req, res) => {
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'lib', 'home.html'));
});

app.get(['/api/exercise3/pages/about', '/api/exercise3/pages/about/'], (req, res) => {
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'lib', 'about.html'));
});

app.get(['/api/exercise3/pages/contact', '/api/exercise3/pages/contact/'], (req, res) => {
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'lib', 'contact.html'));
});

// -------------------------------------------------------------
// Exercise 4: Static files served automatically from public/
// -------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// Root redirect to Exercise 1 index page
app.get('/', (req, res) => {
    res.status(200).type('text/html').sendFile(path.join(__dirname, 'lib', 'index.html'));
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 NodeJS Assignment 2 Server running on Port ${PORT}`);
    console.log(`==================================================`);
    console.log(`Exercise 1: http://localhost:${PORT}/api/exercise1`);
    console.log(`Exercise 2: http://localhost:${PORT}/api/exercise2`);
    console.log(`Exercise 3 Home:    http://localhost:${PORT}/api/exercise3/pages/home`);
    console.log(`Exercise 3 About:   http://localhost:${PORT}/api/exercise3/pages/about`);
    console.log(`Exercise 3 Contact: http://localhost:${PORT}/api/exercise3/pages/contact`);
    console.log(`Exercise 4 Home:    http://localhost:${PORT}/home.html`);
    console.log(`Exercise 4 About:   http://localhost:${PORT}/about.html`);
    console.log(`Exercise 4 Contact: http://localhost:${PORT}/contact.html`);
    console.log(`==================================================\n`);
});

module.exports = { app, server };
