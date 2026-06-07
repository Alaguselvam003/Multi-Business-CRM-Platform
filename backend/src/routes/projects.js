const express = require('express');
const router = express.Router();

let projects = [
  { id: 1, name: 'CRM Integration', description: 'Integrate CRM with ERP', status: 'in-progress', progress: 60, start_date: '2025-06-01', end_date: '2025-08-31' },
  { id: 2, name: 'Website Redesign', description: 'Full website overhaul', status: 'planning', progress: 10, start_date: '2025-07-15', end_date: '2025-09-30' },
];

router.get('/', (req, res) => res.json(projects));
router.post('/', (req, res) => {
  const p = { id: Date.now(), ...req.body };
  projects.push(p);
  res.status(201).json(p);
});
router.put('/:id', (req, res) => {
  const p = projects.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ message: 'Not found' });
  Object.assign(p, req.body);
  res.json(p);
});

module.exports = router;
