const express = require('express');
const router = express.Router();

let tickets = [
  { id: 1, title: 'Login issue', description: 'Cannot login to portal', status: 'open', priority: 'high' },
  { id: 2, title: 'Invoice not generated', description: 'PDF not downloading', status: 'in-progress', priority: 'medium' },
];

router.get('/', (req, res) => res.json({ data: tickets }));
router.post('/', (req, res) => {
  const t = { id: Date.now(), status: 'open', ...req.body };
  tickets.push(t);
  res.status(201).json(t);
});
router.put('/:id', (req, res) => {
  const t = tickets.find(t => t.id === parseInt(req.params.id));
  if (!t) return res.status(404).json({ message: 'Not found' });
  Object.assign(t, req.body);
  res.json(t);
});

module.exports = router;
