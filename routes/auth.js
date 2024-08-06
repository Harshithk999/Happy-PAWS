const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Register a new user
router.post('/register', (req, res) => {
    const { username, email, phone, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        const sql = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, phone, hash], (err, result) => {
            if (err) throw err;
            res.send('User registered');
        });
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, result) => {
                if (result) {
                    req.session.user = results[0];
                    res.send({ loggedIn: true, user: results[0] });
                } else {
                    res.send({ loggedIn: false });
                }
            });
        } else {
            res.send({ loggedIn: false });
        }
    });
});

// Check if user is logged in
router.get('/checkAuth', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

// Add a new dog
router.post('/addDog', upload.single('image'), (req, res) => {
    const { breed, age, color, price, description } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';
    const sql = 'INSERT INTO dogs (breed, age, color, price, image, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [breed, age, color, price, image, description], (err, result) => {
        if (err) throw err;
        res.send('Dog added successfully');
    });
});

// Fetch sell requests
router.get('/sellRequests', (req, res) => {
    const sql = 'SELECT * FROM sell_requests';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Accept a sell request
router.post('/acceptSellRequest', (req, res) => {
    const { id, breed, age, color, price, image, address, description } = req.body;
    const insertDogSql = 'INSERT INTO dogs (breed, age, color, price, image, description) VALUES (?, ?, ?, ?, ?, ?)';
    const updateRequestSql = 'UPDATE sell_requests SET status = "accepted" WHERE id = ?';

    db.query(insertDogSql, [breed, age, color, price, image, description], (err, result) => {
        if (err) throw err;

        db.query(updateRequestSql, [id], (err, result) => {
            if (err) throw err;
            res.send('Sell request accepted and dog added to the list.');
        });
    });
});

// Fetch dogs for sale
router.get('/dogs', (req, res) => {
    const sql = 'SELECT * FROM dogs';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Fetch a specific dog by ID
router.get('/dog/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM dogs WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Submit a review
router.post('/review', (req, res) => {
    const { dogId, text, username } = req.body;
    const sql = 'INSERT INTO reviews (dog_id, text, username) VALUES (?, ?, ?)';
    db.query(sql, [dogId, text, username], (err, result) => {
        if (err) throw err;
        res.send('Review submitted');
    });
});

// Fetch reviews for a specific dog
router.get('/reviews/:dogId', (req, res) => {
    const { dogId } = req.params;
    const sql = 'SELECT * FROM reviews WHERE dog_id = ?';
    db.query(sql, [dogId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Remove a dog from the listings
router.post('/removeDog', (req, res) => {
    const { id } = req.body;

    // First, delete the associated reviews
    const deleteReviewsSql = 'DELETE FROM reviews WHERE dog_id = ?';
    db.query(deleteReviewsSql, [id], (err, result) => {
        if (err) throw err;

        // Then, delete the dog
        const deleteDogSql = 'DELETE FROM dogs WHERE id = ?';
        db.query(deleteDogSql, [id], (err, result) => {
            if (err) throw err;
            res.send('Dog and associated reviews removed from listings.');
        });
    });
});

// Update user profile
router.post('/updateProfile', (req, res) => {
    const { userId, email, phone } = req.body;
    const sql = 'UPDATE users SET email = ?, phone = ? WHERE id = ?';
    db.query(sql, [email, phone, userId], (err, result) => {
        if (err) throw err;
        res.send('Profile updated');
    });
});

// Submit a sell request
router.post('/sell', upload.single('image'), (req, res) => {
    const { breed, age, color, price, address, description, userId } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';
    const sql = 'INSERT INTO sell_requests (breed, age, color, price, address, description, user_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [breed, age, color, price, address, description, userId, image], (err, result) => {
        if (err) throw err;
        res.send('Sell request submitted');
    });
});

// Admin login
router.post('/adminLogin', (req, res) => {
    const { email, password } = req.body;
    const adminEmail = ''; // replace with actual admin email
    const adminPassword = 'admin'; // replace with actual admin password

    if (email === adminEmail && password ===adminPassword) {
        req.session.user = { email: adminEmail, role: 'admin' };
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
});

// Logout a user
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send({ success: false, message: 'Unable to logout' });
        }
        res.clearCookie('connect.sid');
        res.send({ success: true, message: 'Logged out' });
    });
});

module.exports = router;