const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Endpoint: /api/exercise3/pages/home -> home.html
app.get(['/api/exercise3/pages/home', '/api/exercise3/pages/home/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'home.html');
    res.status(200).type('text/html').sendFile(filePath);
});

// Endpoint: /api/exercise3/pages/about -> about.html
app.get(['/api/exercise3/pages/about', '/api/exercise3/pages/about/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'about.html');
    res.status(200).type('text/html').sendFile(filePath);
});

// Endpoint: /api/exercise3/pages/contact -> contact.html
app.get(['/api/exercise3/pages/contact', '/api/exercise3/pages/contact/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'contact.html');
    res.status(200).type('text/html').sendFile(filePath);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Exercise 3 Server is listening on port ${PORT}`);
    console.log(`Home:    http://localhost:${PORT}/api/exercise3/pages/home`);
    console.log(`About:   http://localhost:${PORT}/api/exercise3/pages/about`);
    console.log(`Contact: http://localhost:${PORT}/api/exercise3/pages/contact`);
});

module.exports = { app, server };
