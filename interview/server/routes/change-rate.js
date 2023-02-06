const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db');

router.post('/change-rate', [
  check('from').not().isEmpty().isCurrency(),
  check('to').not().isEmpty().isCurrency(),
  check('rate').not().isEmpty().isFloat()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { from, to, rate } = req.body;

  try {
    const checkExists = await db.query(
      'SELECT * FROM exchange_rates WHERE "from" = $1 AND "to" = $2',
      [from, to]
    );
    if (checkExists.rowCount > 0) {
      return res.status(400).json({
        message: `Exchange rate from ${from} to ${to} already exists`
      });
    }

    const result = await db.query(
      'INSERT INTO exchange_rates ("from", "to", rate) VALUES ($1, $2, $3)',
      [from, to, rate]
    );
    return res.status(201).json({
      message: `Exchange rate from ${from} to ${to} added successfully`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
