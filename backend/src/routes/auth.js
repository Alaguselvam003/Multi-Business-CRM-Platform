const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const users = [
  {
    id: 1,
    email: 'demo@zenjade.com',
    password: '$2a$10$xqv/DX0F0lhWdDln65fSb.hqYa86ce.SyQt4M5YSHEfzXV8AsG8gy', // demo123
    name: 'Demo User',
    role: 'admin',
  },
];

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post('/logout', (req, res) => res.json({ message: 'Logged out successfully' }));

module.exports = router;
