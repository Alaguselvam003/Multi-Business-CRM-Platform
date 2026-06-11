const http = require('http');

const payload = JSON.stringify({
  email: 'test@example.com',
  password: 'password123',
  companyName: 'Test Inc',
  name: 'Tester'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register-company',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Register Response:', data);

    const otpPayload = JSON.stringify({ email: 'test@example.com', type: 'email' });
    const otpReq = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/send-otp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': otpPayload.length
      }
    }, otpRes => {
      let otpData = '';
      otpRes.on('data', chunk => otpData += chunk);
      otpRes.on('end', () => console.log('OTP Response:', otpData));
    });
    otpReq.write(otpPayload);
    otpReq.end();
  });
});

req.write(payload);
req.end();
