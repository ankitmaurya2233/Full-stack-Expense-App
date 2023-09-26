// controllers/expenseController.js
const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

// Create a new expense
router.post('/expenses', async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const expense = await Expense.create({ description, amount, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create expense' });
  }
});

// Get all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
