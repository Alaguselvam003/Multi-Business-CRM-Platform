const http = require('http');
const jwt = require('jsonwebtoken');

// Generate a valid token for testing
const token = jwt.sign(
  { id: 1, email: 'demo@zenjade.com', role: 'Super Admin', department: 'Admin' },
  process.env.JWT_SECRET || 'your-secret-key',
  { expiresIn: '24h' }
);

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/analytics/dashboard',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Dashboard Response:', data));
});

req.end();
