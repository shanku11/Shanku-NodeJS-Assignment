const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Endpoint for Exercise 1
app.get(['/api/exercise1', '/api/exercise1/'], (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'index.html');
    res.status(200).type('text/html').sendFile(filePath);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Exercise 1 Server is listening on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/api/exercise1`);
});

module.exports = { app, server };
