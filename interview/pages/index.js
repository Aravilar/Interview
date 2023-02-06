import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Select, Button } from 'antd';
import Form1 from '../components/Form';
import Result from '../components/Result';
import { getSymbols } from '../pages/api/symbols';
import { convert } from '../pages/api/convert';
import styles from '../styles/Home.module.css';

const { Option } = Select;

const Home = () => {
  const [symbols, setSymbols] = useState(['HUF', 'EUR']);
  const symbolsAvailable = ['HUF', 'EUR', 'USD', 'CHF', 'GBP', 'CNY']
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('HUF');
  const [to, setTo] = useState('EUR');

  const [form] = Form.useForm();
  const [converted, setConverted] = useState(null);
  const [addRateModalVisible, setAddRateModalVisible] = useState(false);

  useEffect(() => {
    getSymbols().then(setSymbols);
  }, []);

  const handleSubmit = async () => {
    if (!from || !to) {
      return;
    }

    let cleanAmount = amount.replace(/\s/g, '');
    const res = await convert({ from, to, cleanAmount });
    setResult(res);
  };

  const handleAddRate = () => {
    setAddRateModalVisible(true);
  };

  const handleAddRateCancel = () => {
    setAddRateModalVisible(false);
  };

  const handleAddRateCreate = () => {
    //TODO: "Új árfolyam hozzáadása az adatbázishoz" implementálása
    setAddRateModalVisible(false);
  };

  return (
    <>
      <Head>
        <title>Online Valutaváltó</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Online Valutaváltó" />
        <meta name="keywords" content="online, valutaváltó" />
        <meta name="author" content="Benjamin Laczkovics" />
      </Head>
      <main>
        <h1 className={styles.header}>Online Valutaváltó</h1>
        <div className={styles.formDiv}>
          <Form1
            symbols={symbols}
            amount={amount}
            from={from}
            to={to}
            setAmount={setAmount}
            setFrom={setFrom}
            setTo={setTo}
            onSubmit={handleSubmit}
          />
          {result && <Result result={result} from={from} to={to} amount={amount}/>}
        </div>
    <div className="convert-page">
      <Button onClick={handleAddRate} className={styles.header}>Új átváltási ráta felvétele</Button>
      {converted !== null && (
        <div className="converted-result">
          <p>{converted}</p>
        </div>
    )}
    <Modal
      title="Új átváltási ráta felvétele"
      visible={addRateModalVisible}
      onCancel={handleAddRateCancel}
      footer={[
        <Button key="save" type="primary" onClick={handleAddRateCreate}>
          Mentés
        </Button>,
        <Button key="cancel" onClick={handleAddRateCancel}>
          Mégse
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="from"
          rules={[{ required: true, message: 'Erről a valutáról' }]}
        >
          <Select placeholder="Erről a valutáról">
            {symbolsAvailable.map(currency => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="to"
          rules={[{ required: true, message: 'Erre a valutára' }]}
        >
          <Select placeholder="Erre a valutára">
            {symbolsAvailable.map(currency => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="rate"
          rules={[{ required: true, message: 'Ráta' }]}
        >
          <Input type="number" placeholder="Ráta"/>
        </Form.Item>
      </Form>
    </Modal>
  </div>
      </main>
    </>
  );
};

export default Home;
