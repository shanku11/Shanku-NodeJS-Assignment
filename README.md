# NodeJS Assignment 2 - Express Web Servers & Static Site Hosting

A full-stack NodeJS assignment featuring multiple Express.js servers, custom middleware, dynamic file parsing, static website delivery, and unified deployment on Vercel.

🌐 **Live Deployment**: [https://shanku-node-js-assignment.vercel.app/](https://shanku-node-js-assignment.vercel.app/)  
📦 **GitHub Repository**: [https://github.com/shanku11/Shanku-NodeJS-Assignment.git](https://github.com/shanku11/Shanku-NodeJS-Assignment.git)

---

## 📋 Table of Contents
- [Assignment Overview](#-assignment-overview)
- [Exercises Breakdown](#-exercises-breakdown)
  - [Exercise 1: Single Page Response](#exercise-1-single-page-response)
  - [Exercise 2: File Parsing to HTML Table](#exercise-2-file-parsing-to-html-table)
  - [Exercise 3: Dedicated Multi-Page Endpoints](#exercise-3-dedicated-multi-page-endpoints)
  - [Exercise 4: Static Site Hosting](#exercise-4-static-site-hosting)
- [Unified Server](#-unified-server-serverjs)
- [Automated Verification Tests](#-automated-verification-tests)
- [Local Installation & Setup](#-local-installation--setup)
- [Project Directory Structure](#-project-directory-structure)

---

## 🚀 Assignment Overview

This project satisfies all requirements for **NodeJS Assignment 2**:
- **Framework**: Express.js 4
- **Runtime**: Node.js
- **Cloud Hosting**: Vercel Serverless Architecture
- **Design System**: Vanilla CSS with modern dark mode, glassmorphism, and responsive layout.

---

## 📌 Exercises Breakdown

### Exercise 1: Single Page Response
- **File**: `exercise1.js`
- **Route**: `GET /api/exercise1`
- **Description**: Returns the content of `lib/index.html` with HTTP status `200` and `Content-Type: text/html`.
- **Live Endpoint**: [Test /api/exercise1](https://shanku-node-js-assignment.vercel.app/api/exercise1)

### Exercise 2: File Parsing to HTML Table
- **File**: `exercise2.js`
- **Route**: `GET /api/exercise2`
- **Description**: Reads delimiter-separated user data from `lib/users.txt` (`Name | Age | Gender | City`), parses the contents into rows and columns, and dynamically generates an HTML `<table>`.
- **Live Endpoint**: [Test /api/exercise2](https://shanku-node-js-assignment.vercel.app/api/exercise2)

### Exercise 3: Dedicated Multi-Page Endpoints
- **File**: `exercise3.js`
- **Routes**:
  - `GET /api/exercise3/pages/home` -> Serves `lib/home.html`
  - `GET /api/exercise3/pages/about` -> Serves `lib/about.html`
  - `GET /api/exercise3/pages/contact` -> Serves `lib/contact.html`
- **Description**: Modular routing serving individual HTML pages under the `lib/` directory with `200 OK`.
- **Live Endpoints**:
  - [Home](https://shanku-node-js-assignment.vercel.app/api/exercise3/pages/home)
  - [About](https://shanku-node-js-assignment.vercel.app/api/exercise3/pages/about)
  - [Contact](https://shanku-node-js-assignment.vercel.app/api/exercise3/pages/contact)

### Exercise 4: Static Site Hosting
- **File**: `exercise4.js`
- **Routes**:
  - `GET /home.html` -> Serves `public/home.html`
  - `GET /about.html` -> Serves `public/about.html`
  - `GET /contact.html` -> Serves `public/contact.html`
  - `GET /style.css` -> Serves `public/style.css`
  - `GET /script.js` -> Serves `public/script.js`
  - `GET /` -> Redirects to `/home.html`
- **Description**: Built with `express.static('public')` to automatically serve static web assets with full interactive styling, contact form validation, and toast notifications.
- **Live Endpoints**:
  - [Showcase Home](https://shanku-node-js-assignment.vercel.app/home.html)
  - [About Page](https://shanku-node-js-assignment.vercel.app/about.html)
  - [Contact Page](https://shanku-node-js-assignment.vercel.app/contact.html)

---

## ⚡ Unified Server (`server.js`)

The project includes a unified `server.js` file that aggregates all 4 exercises under a single host.

- Automatically detects execution environment (direct Node execution vs. Vercel Serverless Function).
- Provides centralized routing, fallbacks, and error handlers.
- Powers the live deployment on Vercel.

---

## 🧪 Automated Verification Tests

The repository contains an automated test suite (`test-endpoints.js`) verifying all 30 criteria across every exercise and the unified server:

```bash
npm test
```

### Test Suite Output:
```text
======================================================
🧪 Running NodeJS Assignment 2 Verification Tests
======================================================

[Testing Exercise 1]
  ✔ PASS: Exercise 1 returns HTTP 200 OK
  ✔ PASS: Exercise 1 returns text/html content type
  ✔ PASS: Exercise 1 body contains index page content

[Testing Exercise 2]
  ✔ PASS: Exercise 2 returns HTTP 200 OK
  ✔ PASS: Exercise 2 returns text/html content type
  ✔ PASS: Exercise 2 returns an HTML table
  ✔ PASS: Exercise 2 table includes header columns
  ✔ PASS: Exercise 2 table includes data rows from users.txt

[Testing Exercise 3]
  ✔ PASS: Exercise 3 Home returns HTTP 200 OK
  ✔ PASS: Exercise 3 Home returns text/html
  ✔ PASS: Exercise 3 Home body contains home page content
  ✔ PASS: Exercise 3 About returns HTTP 200 OK
  ✔ PASS: Exercise 3 About returns text/html
  ✔ PASS: Exercise 3 About body contains about page content
  ✔ PASS: Exercise 3 Contact returns HTTP 200 OK
  ✔ PASS: Exercise 3 Contact returns text/html
  ✔ PASS: Exercise 3 Contact body contains contact page content

[Testing Exercise 4]
  ✔ PASS: Exercise 4 root (/) redirects to /home.html
  ✔ PASS: Exercise 4 redirect destination is /home.html
  ✔ PASS: Exercise 4 static /home.html returns HTTP 200 OK
  ✔ PASS: Exercise 4 static /about.html returns HTTP 200 OK
  ✔ PASS: Exercise 4 static /contact.html returns HTTP 200 OK
  ✔ PASS: Exercise 4 static /style.css returns HTTP 200 OK
  ✔ PASS: Exercise 4 static /style.css has CSS mime type
  ✔ PASS: Exercise 4 static /script.js returns HTTP 200 OK

[Testing Unified Server (server.js)]
  ✔ PASS: Unified Server root (/) redirects to /home.html
  ✔ PASS: Unified Server /api/exercise1 returns HTTP 200 OK
  ✔ PASS: Unified Server /api/exercise2 returns HTML table
  ✔ PASS: Unified Server /api/exercise3/pages/home returns Home Page
  ✔ PASS: Unified Server /home.html returns HTTP 200 OK

======================================================
📊 Test Summary: 30/30 tests passed
======================================================

🎉 All assignment verification tests passed successfully!
```

---

## 💻 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shanku11/Shanku-NodeJS-Assignment.git
   cd Shanku-NodeJS-Assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the servers**:
   - Start the Unified Server:
     ```bash
     npm start
     ```
   - Or start individual exercise servers:
     ```bash
     npm run ex1   # Exercise 1
     npm run ex2   # Exercise 2
     npm run ex3   # Exercise 3
     npm run ex4   # Exercise 4
     ```

4. **Run the automated verification suite**:
   ```bash
   npm test
   ```

---

## 📁 Project Directory Structure

```text
Shanku-NodeJS-Assignment/
├── api/
│   └── index.js              # Vercel serverless function entrypoint
├── lib/
│   ├── about.html            # Exercise 3 template
│   ├── contact.html          # Exercise 3 template
│   ├── home.html             # Exercise 3 template
│   ├── index.html            # Exercise 1 template
│   └── users.txt             # Exercise 2 delimited data file
├── public/
│   ├── about.html            # Exercise 4 static page
│   ├── contact.html          # Exercise 4 static page
│   ├── home.html             # Exercise 4 main showcase page
│   ├── script.js             # Exercise 4 interactive JS (toast, form handler)
│   └── style.css             # Exercise 4 modern CSS design system
├── exercise1.js              # Standalone Exercise 1 server
├── exercise2.js              # Standalone Exercise 2 server
├── exercise3.js              # Standalone Exercise 3 server
├── exercise4.js              # Standalone Exercise 4 server
├── server.js                 # Unified production & local server
├── test-endpoints.js         # Automated 30-criteria test suite
├── vercel.json               # Vercel deployment configuration
├── package.json              # Project metadata, dependencies, scripts
├── .gitignore                # Excludes node_modules and env files
└── README.md                 # Project documentation
```

---
*Created for NodeJS Assignment 2 • Deployed with Express.js & Vercel*
