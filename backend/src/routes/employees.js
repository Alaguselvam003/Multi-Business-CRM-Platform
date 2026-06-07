const express = require('express');
const router = express.Router();

let employees = [
  { id: 1, name: 'Amit Singh', email: 'amit@zenjade.com', designation: 'Sales Manager', department: 'Sales', status: 'active', join_date: '2023-01-15' },
  { id: 2, name: 'Sunita Patel', email: 'sunita@zenjade.com', designation: 'Support Lead', department: 'Support', status: 'active', join_date: '2023-03-01' },
];

router.get('/', (req, res) => res.json(employees));
router.post('/', (req, res) => {
  const e = { id: Date.now(), ...req.body };
  employees.push(e);
  res.status(201).json(e);
});
router.put('/:id', (req, res) => {
  const e = employees.find(e => e.id === parseInt(req.params.id));
  if (!e) return res.status(404).json({ message: 'Not found' });
  Object.assign(e, req.body);
  res.json(e);
});

module.exports = router;
