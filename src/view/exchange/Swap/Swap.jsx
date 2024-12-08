import { useEffect, useState } from 'react';

import SwapCard from './SwapCard/SwapCard';
import { fetchCryptos } from '../../../api/exchangeApi';
import { getUser } from '../../../api/userApi';
import styles from './Swap.module.scss';

const swapCards = [
  {
    type: 'send',
    gradient:
      'linear-gradient(106.24deg, rgb(92, 106, 196) -3.53%, rgb(156, 39, 176) 117.96%)',
    coin: 'SCOIN',
  },
  {
    type: 'receive',
    gradient: 'linear-gradient(90deg, rgb(54, 209, 220), rgb(91, 134, 229))',
    coin: 'TON',
  },
];

const Swap = () => {
  const [cards, setCards] = useState(swapCards);
  const [isSwapping, setIsSwapping] = useState(false);
  const [user, setUser] = useState({});
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data)
      console.log(data);
    });
    fetchCryptos().then((data) => {
      setCryptos(data);
      console.log(data);
    });
  }, []);

  const revertCards = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setCards([cards[1], cards[0]]);
    }, 200);

    setTimeout(() => {
      setIsSwapping(false);
    }, 200);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.card} ${isSwapping ? styles.slideOutDown : styles.slideInUp}`}>
          <SwapCard options={cryptos} props={cards[0]} />
        </div>
        <div className={styles.swapButtonContainer}>
          <p className="f-14">1 SCoin = 0.001897645789 TON</p>
          <button onClick={() => revertCards()}></button>
        </div>
        <div
          className={`${styles.card} ${
            isSwapping ? styles.slideOutUp : styles.slideInDown
          }`}
        >
          <SwapCard props={cards[1]} />
        </div>
        <button type="button" className={styles.button}>
          Вывести
        </button>
      </div>
    </section>
  );
};

export default Swap;
