# TK Web Application Backend

This is the backend service for the TK web application. It provides an API that enables users to send an itinerary of activities via email. The backend also logs sent emails and allows them to be viewed and deleted.

# Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
npm install
```

# Available Scripts

In the project directory, you can run:

```bash
npm start
```

Runs the app in development mode. Open http://localhost:5000 to communicate with the backend API.

```bash
npm test
```

Launches the test runner in the interactive watch mode.

```bash
npm run build
```

Builds the app for production.

## Core Features

- Email sending: Sends an email with an itinerary of activities to the specified recipient.
- Email logging: Logs all sent emails.
- Email deletion: Allows for the deletion of sent emails.

## Tech Stack

- Node.js
- Express.js
- Nodemailer
- Mongoose
- MongoDB

## Folder Structure

The backend code resides in the root directory. You'll find the following directories and files:

```bash
.
├── controllers/
│   ├── emailController.js
├── models/
│   ├── Email.js
├── routes/
│   ├── post.js
├── utils/
│   ├── sendEmail.js
├── .env
├── app.js
└── package.json
```

## Code Conventions

This project uses the following conventions:

- ES6 syntax
- MVC architectural pattern
- Environment variables for sensitive data
- Promises and async/await for async operations
- Error handling with try/catch blocks
