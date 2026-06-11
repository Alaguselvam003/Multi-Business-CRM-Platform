const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Follow up with Raj Kumar', description: '', status: 'open', priority: 'high', due_date: '2025-07-30' },
  { id: 2, title: 'Send proposal to MegaCorp', description: '', status: 'in-progress', priority: 'medium', due_date: '2025-07-28' },
];

router.get('/', (req, res) => res.json({ data: tasks }));
router.post('/', (req, res) => {
  const t = { id: Date.now(), ...req.body };
  tasks.push(t);
  res.status(201).json(t);
});
router.put('/:id', (req, res) => {
  const t = tasks.find(t => t.id === parseInt(req.params.id));
  if (!t) return res.status(404).json({ message: 'Not found' });
  Object.assign(t, req.body);
  res.json(t);
});
router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
