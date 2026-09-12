const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Serve all static files from the 'public' folder automatically
// Express static middleware handles 200 status codes and text/html MIME types
app.use(express.static(path.join(__dirname, 'public')));

// Optional: redirect root URL to /home.html for convenience
app.get('/', (req, res) => {
    res.redirect('/home.html');
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Exercise 4 Static Web Server is listening on port ${PORT}`);
    console.log(`Home:    http://localhost:${PORT}/home.html`);
    console.log(`About:   http://localhost:${PORT}/about.html`);
    console.log(`Contact: http://localhost:${PORT}/contact.html`);
});

module.exports = { app, server };
