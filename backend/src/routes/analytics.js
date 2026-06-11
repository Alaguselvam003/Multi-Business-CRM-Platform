const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ data: { customers: 124, leads: 48, revenue: '₹4.2L', tasks: 31 } });
});

router.get('/revenue', (req, res) => {
  res.json({ data: [
    { month: 'Jan', revenue: 42000 }, { month: 'Feb', revenue: 58000 }, { month: 'Mar', revenue: 51000 },
    { month: 'Apr', revenue: 67000 }, { month: 'May', revenue: 74000 }, { month: 'Jun', revenue: 89000 },
    { month: 'Jul', revenue: 95000 }, { month: 'Aug', revenue: 88000 }, { month: 'Sep', revenue: 102000 },
    { month: 'Oct', revenue: 115000 }, { month: 'Nov', revenue: 108000 }, { month: 'Dec', revenue: 130000 },
  ]});
});

router.get('/lead-conversion', (req, res) => {
  res.json({ data: [
    { stage: 'New', count: 40 }, { stage: 'Contacted', count: 30 }, { stage: 'Proposal', count: 20 },
    { stage: 'Negotiation', count: 12 }, { stage: 'Won', count: 8 },
  ]});
});

router.get('/sales-performance', (req, res) => {
  res.json({ data: [
    { name: 'Amit Singh', deals: 12, revenue: 480000 },
    { name: 'Sunita Patel', deals: 8, revenue: 320000 },
  ]});
});

module.exports = router;
