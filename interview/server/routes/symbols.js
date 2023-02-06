const express = require('express');
const symbolsRouter = express.Router();
const { getSymbolsFromDb } = require('../database');

symbolsRouter.get('/', async (req, res) => {
  const symbols = await getSymbolsFromDb();
  res.send(symbols);
});

module.exports = symbolsRouter;
