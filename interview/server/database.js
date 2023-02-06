const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export const getSymbolsFromDb = () =>
  pool
    .query('SELECT symbol FROM currencies')
    .then(res => res.rows.map(row => row.symbol));

export const convertCurrency = async ({ from, to, amount }) => {
    // Az átváltási ráták lehivása az adatbázisból
    const exchangeRate = await pool
        .query(
            "SELECT rate FROM exchange_rates WHERE from_currency='${from}' AND to_currency='${to}'"
        )
        .then(res => res.rows[0].rate);
    
    return exchangeRate * amount;
};
