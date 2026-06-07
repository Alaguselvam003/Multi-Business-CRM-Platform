const express = require('express');
const router = express.Router();

let invoices = [
  { id: 1, invoice_number: 'INV-001', amount: 50000, tax: 9000, status: 'paid', due_date: '2025-07-15' },
  { id: 2, invoice_number: 'INV-002', amount: 120000, tax: 21600, status: 'sent', due_date: '2025-08-01' },
];

router.get('/', (req, res) => res.json(invoices));
router.post('/', (req, res) => {
  const inv = { id: Date.now(), ...req.body };
  invoices.push(inv);
  res.status(201).json(inv);
});
router.put('/:id', (req, res) => {
  const inv = invoices.find(i => i.id === parseInt(req.params.id));
  if (!inv) return res.status(404).json({ message: 'Not found' });
  Object.assign(inv, req.body);
  res.json(inv);
});
router.get('/:id/pdf', (req, res) => {
  res.json({ message: 'PDF generation requires pdf library integration', invoiceId: req.params.id });
});

module.exports = router;
