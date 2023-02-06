const express = require('express');
const app = express();
const symbolsRouter = require('./routes/symbols');
const convertRouter = require('./routes/convert');
const changeRateRouter = require('./routes/change-rate');

app.use('/symbols', symbolsRouter);
app.use('/convert', convertRouter);
app.use('/change-rate', changeRateRouter);

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
