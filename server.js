/**
 * Unified Server for NodeJS Assignment 2
 * 
 * Combines all endpoints from Exercise 1, 2, 3, and 4 onto a single server.
 * Compatible with local running (node server.js) and serverless platforms like Vercel.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Resolve path safely whether running locally or in Vercel serverless environment
function getLibPath(filename) {
    const p1 = path.join(__dirname, 'lib', filename);
    if (fs.existsSync(p1)) return p1;
    const p2 = path.join(process.cwd(), 'lib', filename);
    if (fs.existsSync(p2)) return p2;
    return p1;
}

function getPublicPath(filename) {
    const p1 = path.join(__dirname, 'public', filename);
    if (fs.existsSync(p1)) return p1;
    const p2 = path.join(process.cwd(), 'public', filename);
    if (fs.existsSync(p2)) return p2;
    return p1;
}

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
// Exercise 4: Static files served from public/
// -------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));

// -------------------------------------------------------------
// Exercise 1: Return lib/index.html on /api/exercise1
// -------------------------------------------------------------
app.get(['/api/exercise1', '/api/exercise1/'], (req, res) => {
    const filePath = getLibPath('index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading lib/index.html:', err);
            return res.status(500).type('text/html').send('<h1>500 Internal Server Error</h1><p>Could not read lib/index.html</p>');
        }
        res.status(200).type('text/html').send(data);
    });
});

// -------------------------------------------------------------
// Exercise 2: Return HTML table from users.txt on /api/exercise2
// -------------------------------------------------------------
app.get(['/api/exercise2', '/api/exercise2/'], (req, res) => {
    const filePath = getLibPath('users.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading lib/users.txt:', err);
            return res.status(500).type('text/html').send('<h1>500 Internal Server Error</h1><p>Error reading users file</p>');
        }
        const tableHtml = convertTxtToTable(data);
        res.status(200).type('text/html').send(tableHtml);
    });
});

// -------------------------------------------------------------
// Exercise 3: Routes for home, about, and contact under lib/
// -------------------------------------------------------------
app.get(['/api/exercise3/pages/home', '/api/exercise3/pages/home/'], (req, res) => {
    const filePath = getLibPath('home.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading lib/home.html:', err);
            return res.status(500).type('text/html').send('<h1>500 Internal Server Error</h1><p>Error reading home.html</p>');
        }
        res.status(200).type('text/html').send(data);
    });
});

app.get(['/api/exercise3/pages/about', '/api/exercise3/pages/about/'], (req, res) => {
    const filePath = getLibPath('about.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading lib/about.html:', err);
            return res.status(500).type('text/html').send('<h1>500 Internal Server Error</h1><p>Error reading about.html</p>');
        }
        res.status(200).type('text/html').send(data);
    });
});

app.get(['/api/exercise3/pages/contact', '/api/exercise3/pages/contact/'], (req, res) => {
    const filePath = getLibPath('contact.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading lib/contact.html:', err);
            return res.status(500).type('text/html').send('<h1>500 Internal Server Error</h1><p>Error reading contact.html</p>');
        }
        res.status(200).type('text/html').send(data);
    });
});

// Explicit fallbacks for Exercise 4 pages
app.get('/home.html', (req, res) => {
    const filePath = getPublicPath('home.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('Not Found');
        res.status(200).type('text/html').send(data);
    });
});

app.get('/about.html', (req, res) => {
    const filePath = getPublicPath('about.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('Not Found');
        res.status(200).type('text/html').send(data);
    });
});

app.get('/contact.html', (req, res) => {
    const filePath = getPublicPath('contact.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('Not Found');
        res.status(200).type('text/html').send(data);
    });
});

// Root URL handler: redirect to /home.html (as specified in Exercise 4)
app.get('/', (req, res) => {
    res.redirect('/home.html');
});


// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).type('text/html').send(`<h1>500 Internal Server Error</h1><p>${err.message}</p>`);
});

// Only start the server when executed directly (node server.js)
// In serverless environments (e.g. Vercel), the app function is exported directly
if (require.main === module) {
    app.listen(PORT, () => {
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
}

module.exports = app;
