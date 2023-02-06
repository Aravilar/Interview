import React from 'react';
import { formatNumber } from '../util/formatNumber';

const Result = ({ result, from, to, amount }) => {
  return <div>{amount} {from} = {formatNumber(result)} {to}</div>;
};

export default Result;
