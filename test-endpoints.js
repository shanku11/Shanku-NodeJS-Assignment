/**
 * Automated Verification Test Suite for NodeJS Assignment 2
 * 
 * Verifies all requirements across:
 * - Exercise 1: GET /api/exercise1
 * - Exercise 2: GET /api/exercise2
 * - Exercise 3: GET /api/exercise3/pages/{home,about,contact}
 * - Exercise 4: Static file serving (home.html, about.html, contact.html, style.css, script.js)
 * - Unified Server: server.js
 */

const http = require('http');

// Helper to make an HTTP request to a running test server
function testRequest(server, path, method = 'GET') {
    return new Promise((resolve, reject) => {
        const addr = server.address();
        const options = {
            hostname: '127.0.0.1',
            port: addr.port,
            path: path,
            method: method
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => { body += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });

        req.on('error', reject);
        req.end();
    });
}

// Start a transient server on an ephemeral port
function startTransientServer(app) {
    return new Promise((resolve) => {
        const server = http.createServer(app);
        server.listen(0, '127.0.0.1', () => {
            resolve(server);
        });
    });
}

function stopTransientServer(server) {
    return new Promise((resolve) => {
        server.close(resolve);
    });
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  \x1b[32m✔ PASS:\x1b[0m ${message}`);
    } else {
        failedTests++;
        console.error(`  \x1b[31m✖ FAIL:\x1b[0m ${message}`);
    }
}

async function runTests() {
    console.log('\n======================================================');
    console.log('🧪 Running NodeJS Assignment 2 Verification Tests');
    console.log('======================================================\n');

    // ---------------------------------------------------------
    // 1. Test Exercise 1
    // ---------------------------------------------------------
    console.log('\x1b[36m[Testing Exercise 1]\x1b[0m');
    const ex1App = require('./exercise1');
    const ex1Server = await startTransientServer(ex1App);
    try {
        const res = await testRequest(ex1Server, '/api/exercise1');
        assert(res.statusCode === 200, 'Exercise 1 returns HTTP 200 OK');
        assert((res.headers['content-type'] || '').includes('text/html'), 'Exercise 1 returns text/html content type');
        assert(res.body.includes('Index') || res.body.includes('index.html'), 'Exercise 1 body contains index page content');
    } finally {
        await stopTransientServer(ex1Server);
    }

    // ---------------------------------------------------------
    // 2. Test Exercise 2
    // ---------------------------------------------------------
    console.log('\n\x1b[36m[Testing Exercise 2]\x1b[0m');
    const ex2App = require('./exercise2');
    const ex2Server = await startTransientServer(ex2App);
    try {
        const res = await testRequest(ex2Server, '/api/exercise2');
        assert(res.statusCode === 200, 'Exercise 2 returns HTTP 200 OK');
        assert((res.headers['content-type'] || '').includes('text/html'), 'Exercise 2 returns text/html content type');
        assert(res.body.includes('<table') && res.body.includes('</table>'), 'Exercise 2 returns an HTML table');
        assert(res.body.includes('<th>Name</th>') || res.body.includes('Name'), 'Exercise 2 table includes header columns');
        assert(res.body.includes('<td>Abhi</td>') || res.body.includes('Abhi'), 'Exercise 2 table includes data rows from users.txt');
    } finally {
        await stopTransientServer(ex2Server);
    }

    // ---------------------------------------------------------
    // 3. Test Exercise 3
    // ---------------------------------------------------------
    console.log('\n\x1b[36m[Testing Exercise 3]\x1b[0m');
    const ex3App = require('./exercise3');
    const ex3Server = await startTransientServer(ex3App);
    try {
        const resHome = await testRequest(ex3Server, '/api/exercise3/pages/home');
        assert(resHome.statusCode === 200, 'Exercise 3 Home returns HTTP 200 OK');
        assert((resHome.headers['content-type'] || '').includes('text/html'), 'Exercise 3 Home returns text/html');
        assert(resHome.body.includes('Home Page'), 'Exercise 3 Home body contains home page content');

        const resAbout = await testRequest(ex3Server, '/api/exercise3/pages/about');
        assert(resAbout.statusCode === 200, 'Exercise 3 About returns HTTP 200 OK');
        assert((resAbout.headers['content-type'] || '').includes('text/html'), 'Exercise 3 About returns text/html');
        assert(resAbout.body.includes('About Page'), 'Exercise 3 About body contains about page content');

        const resContact = await testRequest(ex3Server, '/api/exercise3/pages/contact');
        assert(resContact.statusCode === 200, 'Exercise 3 Contact returns HTTP 200 OK');
        assert((resContact.headers['content-type'] || '').includes('text/html'), 'Exercise 3 Contact returns text/html');
        assert(resContact.body.includes('Contact Page'), 'Exercise 3 Contact body contains contact page content');
    } finally {
        await stopTransientServer(ex3Server);
    }

    // ---------------------------------------------------------
    // 4. Test Exercise 4
    // ---------------------------------------------------------
    console.log('\n\x1b[36m[Testing Exercise 4]\x1b[0m');
    const ex4App = require('./exercise4');
    const ex4Server = await startTransientServer(ex4App);
    try {
        const resRoot = await testRequest(ex4Server, '/');
        assert(resRoot.statusCode === 302, 'Exercise 4 root (/) redirects to /home.html');
        assert(resRoot.headers['location'] === '/home.html', 'Exercise 4 redirect destination is /home.html');

        const resHome = await testRequest(ex4Server, '/home.html');
        assert(resHome.statusCode === 200, 'Exercise 4 static /home.html returns HTTP 200 OK');

        const resAbout = await testRequest(ex4Server, '/about.html');
        assert(resAbout.statusCode === 200, 'Exercise 4 static /about.html returns HTTP 200 OK');

        const resContact = await testRequest(ex4Server, '/contact.html');
        assert(resContact.statusCode === 200, 'Exercise 4 static /contact.html returns HTTP 200 OK');

        const resCss = await testRequest(ex4Server, '/style.css');
        assert(resCss.statusCode === 200, 'Exercise 4 static /style.css returns HTTP 200 OK');
        assert((resCss.headers['content-type'] || '').includes('text/css'), 'Exercise 4 static /style.css has CSS mime type');

        const resJs = await testRequest(ex4Server, '/script.js');
        assert(resJs.statusCode === 200, 'Exercise 4 static /script.js returns HTTP 200 OK');
    } finally {
        await stopTransientServer(ex4Server);
    }

    // ---------------------------------------------------------
    // 5. Test Unified Server (server.js)
    // ---------------------------------------------------------
    console.log('\n\x1b[36m[Testing Unified Server (server.js)]\x1b[0m');
    const unifiedApp = require('./server');
    const unifiedServer = await startTransientServer(unifiedApp);
    try {
        const resRoot = await testRequest(unifiedServer, '/');
        assert(resRoot.statusCode === 302, 'Unified Server root (/) redirects to /home.html');

        const resEx1 = await testRequest(unifiedServer, '/api/exercise1');
        assert(resEx1.statusCode === 200, 'Unified Server /api/exercise1 returns HTTP 200 OK');

        const resEx2 = await testRequest(unifiedServer, '/api/exercise2');
        assert(resEx2.statusCode === 200 && resEx2.body.includes('<table'), 'Unified Server /api/exercise2 returns HTML table');

        const resEx3 = await testRequest(unifiedServer, '/api/exercise3/pages/home');
        assert(resEx3.statusCode === 200 && resEx3.body.includes('Home Page'), 'Unified Server /api/exercise3/pages/home returns Home Page');

        const resEx4 = await testRequest(unifiedServer, '/home.html');
        assert(resEx4.statusCode === 200, 'Unified Server /home.html returns HTTP 200 OK');
    } finally {
        await stopTransientServer(unifiedServer);
    }

    // ---------------------------------------------------------
    // Test Summary
    // ---------------------------------------------------------
    console.log('\n======================================================');
    console.log(`📊 Test Summary: ${passedTests}/${totalTests} tests passed`);
    console.log('======================================================\n');

    if (failedTests > 0) {
        console.error(`\x1b[31m${failedTests} tests failed!\x1b[0m`);
        process.exit(1);
    } else {
        console.log('\x1b[32m🎉 All assignment verification tests passed successfully!\x1b[0m\n');
        process.exit(0);
    }
}

runTests().catch(err => {
    console.error('Unexpected error running tests:', err);
    process.exit(1);
});
