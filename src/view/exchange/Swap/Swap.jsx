import { useEffect, useState } from 'react';

import SwapCard from './SwapCard/SwapCard';
import { fetchCryptos } from '../../../api/exchangeApi';
import { getUser } from '../../../api/userApi';
import styles from './Swap.module.scss';

const Swap = () => {
  const [cards, setCards] = useState([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [user, setUser] = useState({});
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data)
    });
    fetchCryptos().then((data) => {
      setCryptos(data);
      setCards([data[0], data[1]])
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
        <div className={`${styles.card} ${isSwapping ? styles.slideOutDown : styles.slideInUp}`} style={{zIndex: 1}}>
          <SwapCard balances={user.balances} options={cryptos} props={cards[0]} onSelect={(option) => setCards([option, cards[1]])} />
        </div>
        <div className={styles.swapButtonContainer}>
          <p className="f-14">1 SCoin = 0.001897645789 TON</p>
          <button onClick={() => revertCards()}></button>
        </div>
        <div
          className={`${styles.card} ${
            isSwapping ? styles.slideOutUp : styles.slideInDown
          }`}
          style={{zIndex: 0}}
        >
          <SwapCard balances={user.balances} options={cryptos} props={cards[1]} onSelect={(option) => setCards([cards[0], option])}/>
        </div>
        <button type="button" className={styles.button}>
          Обменять
        </button>
      </div>
    </section>
  );
};

export default Swap;
