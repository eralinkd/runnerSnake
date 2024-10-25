import { useState } from 'react';
import clsx from 'clsx';
import styles from './CurrencyCard.module.scss';
import SCoin from '../../assets/scoin.png';
import dots from '../../assets/dots.svg';

const CurrencyCard = () => {
  const [show, setShow] = useState(false);

  return (
    <article className={styles.article}>
      <div className={styles.gradientBg}></div>
      <div className={styles.content}>
        <div className={styles.currency}>
          <div className={styles.imgContainer}>
            <img src={SCoin} alt="SCoin" />
          </div>
          <div className={styles.currencyInfo}>
            <h2 className={clsx(styles.currencyName, 'f-18')}>SCoin</h2>
            <span className={clsx(styles.currencyType, 'f-10')}>Token</span>
          </div>
        </div>
        <div className="">
          {show ? (
            <div className="">
              <button type="button" className="button">
                Вывести
              </button>
              <button type="button" className="button">
                Пополнить
              </button>
            </div>
          ) : (
            <div className={styles.actions}>
              <span className={styles.value}>
                <span className="f-30">0.</span>
                <span className="f-23">00</span>
              </span>
              <button
                onClick={() => setShow((prev) => !prev)}
                className={styles.moreActions}
              >
                <img src={dots} alt="icon dots" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CurrencyCard;
