const express = require('express');
const router = express.Router();

let leads = [
  { id: 1, name: 'Raj Kumar', company: 'StartupXYZ', email: 'raj@startup.com', phone: '+91-9000000001', status: 'new', priority: 'high', value: 50000 },
  { id: 2, name: 'Priya Sharma', company: 'MegaCorp', email: 'priya@mega.com', phone: '+91-9000000002', status: 'contacted', priority: 'medium', value: 120000 },
];

router.get('/', (req, res) => res.json({ data: leads }));
router.get('/:id', (req, res) => {
  const l = leads.find(l => l.id === parseInt(req.params.id));
  l ? res.json(l) : res.status(404).json({ message: 'Not found' });
});
router.post('/', (req, res) => {
  const l = { id: Date.now(), ...req.body };
  leads.push(l);
  res.status(201).json(l);
});
router.put('/:id', (req, res) => {
  const l = leads.find(l => l.id === parseInt(req.params.id));
  if (!l) return res.status(404).json({ message: 'Not found' });
  Object.assign(l, req.body);
  res.json(l);
});
router.patch('/:id/status', (req, res) => {
  const l = leads.find(l => l.id === parseInt(req.params.id));
  if (!l) return res.status(404).json({ message: 'Not found' });
  l.status = req.body.status;
  res.json(l);
});
router.delete('/:id', (req, res) => {
  leads = leads.filter(l => l.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
