import { useState } from 'react';
import clsx from 'clsx';
import styles from './CurrencyCard.module.scss';
import dots from '../../assets/dots.svg';
import replenishModalState from '../../state/replenishModalState';

const CurrencyCard = ({ title, type, imgSrc }) => {
  const [show, setShow] = useState(false);
  const open = replenishModalState((state) => state.open);

  const replenishModalOpen = () => {
    open();
  };

  return (
    <article className={styles.article}>
      <div className={styles.gradientBg}></div>
      <div className={styles.content}>
        <div className={styles.currency}>
          <div className={styles.imgContainer}>
            <img src={imgSrc} alt={title} />
          </div>
          <div className={styles.currencyInfo}>
            <h2 className={clsx(styles.currencyName, 'f-18')}>{title}</h2>
            <span className={clsx(styles.currencyType, 'f-10')}>{type}</span>
          </div>
        </div>
        {!show && (
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
        {show && (
          <div className={styles.buttons}>
            <button
              disabled
              type="button"
              className={clsx(styles.button, 'f-16')}
            >
              Вывести
            </button>
            <button
              onClick={replenishModalOpen}
              type="button"
              className={clsx(styles.button, 'f-16')}
            >
              Пополнить
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default CurrencyCard;
