const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { authMiddleware } = require('./middleware/auth');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', authMiddleware, require('./routes/customers'));
app.use('/api/leads', authMiddleware, require('./routes/leads'));
app.use('/api/tasks', authMiddleware, require('./routes/tasks'));
app.use('/api/invoices', authMiddleware, require('./routes/invoices'));
app.use('/api/employees', authMiddleware, require('./routes/employees'));
app.use('/api/projects', authMiddleware, require('./routes/projects'));
app.use('/api/analytics', authMiddleware, require('./routes/analytics'));
app.use('/api/tickets', authMiddleware, require('./routes/tickets'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.get("/", (req, res) => {
  res.json({
    message: "Multi-Business CRM Backend Running Successfully"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
