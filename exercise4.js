const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Serve all static files from the 'public' folder automatically
app.use(express.static(path.join(__dirname, 'public')));

// Optional: redirect root URL to /home.html for convenience
app.get('/', (req, res) => {
    res.redirect('/home.html');
});

// Start the server if executed directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Exercise 4 Static Web Server is listening on port ${PORT}`);
        console.log(`Home:    http://localhost:${PORT}/home.html`);
        console.log(`About:   http://localhost:${PORT}/about.html`);
        console.log(`Contact: http://localhost:${PORT}/contact.html`);
    });
}

module.exports = app;
