import axios from 'axios';

export const convert = ({ from, to, amount }) =>
  axios
    .get(`/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.data);
