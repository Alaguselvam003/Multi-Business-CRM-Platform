const express = require('express');
const router = express.Router();

let customers = [
  { id: 1, name: 'Acme Corp', email: 'info@acme.com', phone: '+91-9876543210', status: 'Active' },
  { id: 2, name: 'Tech Solutions', email: 'contact@techsol.com', phone: '+91-9876543211', status: 'Active' },
];

router.get('/', (req, res) => res.json(customers));
router.get('/:id', (req, res) => {
  const c = customers.find(c => c.id === parseInt(req.params.id));
  c ? res.json(c) : res.status(404).json({ message: 'Not found' });
});
router.post('/', (req, res) => {
  const c = { id: Date.now(), ...req.body };
  customers.push(c);
  res.status(201).json(c);
});
router.put('/:id', (req, res) => {
  const c = customers.find(c => c.id === parseInt(req.params.id));
  if (!c) return res.status(404).json({ message: 'Not found' });
  Object.assign(c, req.body);
  res.json(c);
});
router.delete('/:id', (req, res) => {
  customers = customers.filter(c => c.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
