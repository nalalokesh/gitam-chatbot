const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let role = 'student';

        // Domain Validation
        const normalizedEmail = email.toLowerCase();
        if (normalizedEmail.endsWith('@gitam.in')) {
            role = 'student';
        } else if (normalizedEmail.endsWith('@gitam.edu')) {
            role = 'admin';
        } else {
            return res.status(400).json({ msg: 'Registration allowed only for @gitam.in (Students) or @gitam.edu (Faculty)' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        const payload = { user: { id: user._id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, role: user.role });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id || user._id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, role: user.role, username: user.username });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Get User Profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (user) delete user.password;
        res.json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(401).json({ msg: 'Invalid user ID format (likely an old test session). Please log in again.' });
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
