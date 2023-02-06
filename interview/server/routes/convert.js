const express = require('express');
const convertRouter = express.Router();
const { convertCurrency } = require('../database');

convertRouter.get('/', async (req, res) => {
  const { from, to, amount } = req.query;
  const result = await convertCurrency({ from, to, amount });
  res.send(result);
});

module.exports = convertRouter;
