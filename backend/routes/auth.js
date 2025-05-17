const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 8);
  db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashed, role], (err) => {
      if (err) return res.status(500).send(err);
      res.send('User registered');
    });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');

    const valid = bcrypt.compareSync(password, results[0].password);
    if (!valid) return res.status(401).send('Incorrect password');

    const token = jwt.sign({ id: results[0].id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, user: results[0] });
  });
});

module.exports = router;
