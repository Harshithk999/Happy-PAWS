const express = require('express');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const session = require('express-session');

app.use(express.static('public'));

// Configure session management
app.use(session({
    secret: '1082821', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Use the auth routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});