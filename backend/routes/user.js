const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

module.exports = router;
