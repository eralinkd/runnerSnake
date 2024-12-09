import { useEffect, useState } from 'react';

import SwapCard from './SwapCard/SwapCard';
import SwapModal from './SwapModal/SwapModal';
import { fetchCryptos } from '../../../api/exchangeApi';
import { getUser } from '../../../api/userApi';
import { postSwap } from '../../../api/userApi';
import styles from './Swap.module.scss';
import swapModalState from '../../../state/swapModalState';
import { currencyImages } from '../../../constants/constants';

const Swap = () => {
  const [cards, setCards] = useState([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [user, setUser] = useState({});
  const [cryptos, setCryptos] = useState([]);
  const [sourceV, setSourceV] = useState(0);
  const [targetV, setTargetV] = useState(0);
  const openModal = swapModalState((state) => state.openModal);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
    fetchCryptos().then((data) => {
      setCryptos(data);
      setCards([data[0], data[1]]);
    });
  }, []);

  const revertCards = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setCards([cards[1], cards[0]]);
      const temp = sourceV;
      setSourceV(targetV);
      setTargetV(temp);
    }, 200);

    setTimeout(() => {
      setIsSwapping(false);
    }, 200);
  };

  const handleSourceChange = (value) => {
    setSourceV(value);
    setTargetV(value * 0.001897645789);
  };

  const handleTargetChange = (value) => {
    setTargetV(value);
    setSourceV(value / 0.001897645789);
  };

  const handleTransaction = () => {
    const params = {
      from: cards[0].apiName,
      to: cards[1].apiName,
      amount: sourceV,
    };
    postSwap(params).then((data) => {
      if (data.success) {
        openModal(
          cards[1].simpleName,
          currencyImages[cards[1].apiName],
          targetV
        );
      }
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.card} ${
            isSwapping ? styles.slideOutDown : styles.slideInUp
          }`}
          style={{ zIndex: 1 }}
        >
          <SwapCard
            onChange={handleSourceChange}
            balances={user.balances}
            currentV={sourceV}
            oppositeV={targetV}
            options={cryptos}
            props={cards[0]}
            onSelect={(option) => setCards([option, cards[1]])}
          />
        </div>
        <div className={styles.swapButtonContainer}>
          <p className="f-14">1 SCoin = 0.001897645789 TON</p>
          <button onClick={() => revertCards()}></button>
        </div>
        <div
          className={`${styles.card} ${
            isSwapping ? styles.slideOutUp : styles.slideInDown
          }`}
          style={{ zIndex: 0 }}
        >
          <SwapCard
            onChange={handleTargetChange}
            balances={user.balances}
            currentV={targetV}
            oppositeV={sourceV}
            options={cryptos}
            props={cards[1]}
            onSelect={(option) => setCards([cards[0], option])}
          />
        </div>
        <button
          onClick={handleTransaction}
          type="button"
          className={styles.button}
        >
          Обменять
        </button>
      </div>

      <SwapModal />
    </section>
  );
};

export default Swap;
