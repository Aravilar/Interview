import React from 'react';
import styles from '../styles/form.module.css';
import { formatNumber } from '../util/formatNumber';
import { Input, Select, Button } from 'antd';

const Form = ({ symbols, amount, from, to, setAmount, setFrom, setTo, onSubmit }) => {
  return (
    <>
      <div>
        <div className={styles.items}>
          <label className={styles.single}>
            Összeg:
            <br />
            <Input type="text" value={formatNumber(amount)} onChange={e => setAmount(e.target.value)} />
          </label>
          <label className={styles.single}>
            Erről a valutáról:
            <br />
            <Select className={styles.option} value={from} onChange={e => setFrom(e.target.value)}>
              {symbols.map(symbol => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </Select>
          </label>
          <label>
            Erre a valutára:
            <br />
            <Select className={styles.option} value={to} onChange={e => setTo(e.target.value)}>
              {symbols.map(symbol => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <Button onClick={onSubmit} className={styles.button}>Mehet</Button>
      </div>
    </>
  );
};

export default Form;
