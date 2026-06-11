const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Mock Data
let users = [
  { id: 1, email: 'demo@zenjade.com', password: '$2a$10$xqv/DX0F0lhWdDln65fSb.hqYa86ce.SyQt4M5YSHEfzXV8AsG8gy', name: 'Demo User', role: 'Super Admin', department: 'Admin', isEmailVerified: true, isPhoneVerified: true },
  { id: 2, email: 'sales@zenjade.com', password: '$2a$10$xqv/DX0F0lhWdDln65fSb.hqYa86ce.SyQt4M5YSHEfzXV8AsG8gy', name: 'Sales Exec', role: 'Sales Executive', department: 'Sales', isEmailVerified: true, isPhoneVerified: true },
  { id: 3, email: 'support@zenjade.com', password: '$2a$10$xqv/DX0F0lhWdDln65fSb.hqYa86ce.SyQt4M5YSHEfzXV8AsG8gy', name: 'Support Rep', role: 'Support Executive', department: 'Support', isEmailVerified: true, isPhoneVerified: true }
];
let companies = [{ id: 1, name: 'Zenjade CRM Pro', email: 'admin@zenjade.com' }];
let activeSessions = []; // { id, userId, token, device, ip }
let otpCodes = []; // { userId, code, expiresAt, type }

// Login System
router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, rememberMe } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, department: user.department },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: rememberMe ? '30d' : '24h' }
  );

  // Multi-session support: Store active session
  activeSessions.push({ id: Date.now(), userId: user.id, token, device: req.headers['user-agent'] || 'Unknown', ip: req.ip });

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, department: user.department } });
});

// Company Registration
router.post('/register-company', [body('email').isEmail(), body('password').isLength({ min: 6 }), body('companyName').notEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name, companyName } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already exists' });

  const company = { id: Date.now(), name: companyName, email };
  companies.push(company);

  const newUser = {
    id: Date.now() + 1,
    email,
    password: bcrypt.hashSync(password, 10),
    name: name || 'Admin',
    role: 'Company Admin',
    department: 'Management',
    isEmailVerified: false,
    isPhoneVerified: false,
    companyId: company.id
  };
  users.push(newUser);

  res.status(201).json({ message: 'Company registered successfully. Please verify email.', user: { email: newUser.email, role: newUser.role } });
});

// Employee Registration
router.post('/register-employee', [body('email').isEmail(), body('password').isLength({ min: 6 })], (req, res) => {
  const { email, password, name, department, role } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already exists' });

  const newUser = {
    id: Date.now(),
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    role: role || 'Employee',
    department: department || 'General',
    isEmailVerified: false,
    isPhoneVerified: false
  };
  users.push(newUser);

  res.status(201).json({ message: 'Employee account created successfully.', user: { email: newUser.email, role: newUser.role } });
});

// Send OTP
router.post('/send-otp', (req, res) => {
  const { email, type } = req.body; // type: email or sms
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpCodes.push({ userId: user.id, code, expiresAt: Date.now() + 10 * 60000, type });

  // Mock sending email/sms
  console.log(`Sending ${type} OTP to ${email}: ${code}`);
  res.json({ message: `OTP sent via ${type} successfully.` });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, code, type } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = otpCodes.find(o => o.userId === user.id && o.code === code && o.type === type);
  if (!otp || otp.expiresAt < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Mark as verified
  if (type === 'email') user.isEmailVerified = true;
  if (type === 'sms') user.isPhoneVerified = true;

  // Clear OTP
  otpCodes = otpCodes.filter(o => o !== otp);
  res.json({ message: `${type} verified successfully.` });
});

// Multi-Session: Get active sessions
router.get('/sessions', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const userSessions = activeSessions.filter(s => s.userId === decoded.id);
    res.json(userSessions);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout current session
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  activeSessions = activeSessions.filter(s => s.token !== token);
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
