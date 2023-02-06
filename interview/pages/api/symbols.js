import axios from 'axios';

export const getSymbols = () => axios.get('/symbols').then(res => res.data);
