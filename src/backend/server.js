const express = require('express');
const path = require('path');
const cors = require('cors');

// /c:/Users/User/Desktop/React-fun/store/src/backend/server.js

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse form data

// Optional: serve static files from a public folder (adjust path if needed)
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Simple test route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Example API route
app.get('/example', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000); // force exit if not closed
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Export app for testing
module.exports = app;