import CurrencyCard from './CurrencyCard/CurrencyCard';
import ReplenishModal from './ReplenishModal/ReplenishModal';
import WithdrawModal from './WithdrawModal/WithdrawModal';
import { useEffect, useState } from 'react';
import { fetchCryptos } from '../../../api/exchangeApi';
import styles from './Wallet.module.scss';

const Wallet = () => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch data');
      }
    };

    getData();
  }, []);

  if (error) return <div className={styles.container}>{error}</div>;
  if (!cryptos?.length)
    return <div className={styles.container}>Loading...</div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.list}>
          {cryptos?.map((currency) => (
            <CurrencyCard key={currency.fullName} item={currency} />
          ))}
        </div>
      </div>
      <ReplenishModal />
      <WithdrawModal />
    </>
  );
};

export default Wallet;
