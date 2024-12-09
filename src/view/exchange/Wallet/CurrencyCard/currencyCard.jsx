import { useEffect, useState } from 'react';
import { currencyImages } from '../../../../constants/currency';
import ComponentWithBorder from '../../../../shared/ComponentWithBorder/ComponentWithBorder.jsx';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import replenishModalState from '../../../../state/replenishModalState';
import withdrawModalState from '../../../../state/withdrawModalState';
import dots from '../../../../assets/dots.svg';
import clsx from 'clsx';
import styles from './CurrencyCard.module.scss';

// const gradients = {
//   SCoin: 'linear-gradient(106.24deg, #5C6AC4 -3.53%, #9C27B0 117.96%)',
//   BTC: ' linear-gradient(90deg, #EA4335 0%, #FBBC05 100%)',
//   USDT: 'linear-gradient(90deg, #107C10 0%, #5DC21E 100%)',
//   TON: 'linear-gradient(90deg, #005FED 0%, #0099FF 100%)',
//   Stars: 'linear-gradient(90deg, #EB001B 0%, #FF3333 100%)',
//   default: 'linear-gradient(106.24deg, #5C6AC4 -3.53%, #9C27B0 117.96%)',
// };
// const gradientStyle = gradients[title] || gradients.default;

const CurrencyCard = ({ item, amount }) => {
  const {
    simpleName: title,
    apiName,
    type,
    swap,
    withdraw,
    replenishment,
  } = item;
  const imgSrc = currencyImages[apiName] || currencyImages.default;
  const [show, setShow] = useState(false);
  const openModal = replenishModalState((state) => state.openModal);
  const openWithDrawModal = withdrawModalState((state) => state.openModal);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <ComponentWithBorder className={styles.currencyCardWrapper}>
      <article className={styles.article}>
        <div className={styles.content}>
          <CurrencyCardInfo
            className={styles.currencyCardInfo}
            title={title}
            imgSrc={imgSrc}
            text={type}
          />
          <div className={clsx(styles.actions, show && styles.hide)}>
            {amount ? (
              <span className={styles.value}>
                {parseFloat(amount).toFixed(2)}
              </span>
            ) : (
              <span className={styles.value}>
                <span className="f-30">0.</span>
                <span className="f-23">00</span>
              </span>
            )}
            <button
              onClick={() => setShow((prev) => !prev)}
              className={styles.moreActions}
            >
              <img src={dots} alt="icon dots" />
            </button>
          </div>
          <div className={clsx(styles.buttons, show && styles.show)}>
            {swap && (
              <button type="button" className={clsx(styles.button, 'f-16')}>
                Обмен
              </button>
            )}
            {withdraw && (
              <button
                onClick={() => openWithDrawModal(title, imgSrc)}
                type="button"
                className={clsx(styles.button, 'f-16')}
              >
                Вывести
              </button>
            )}
            {replenishment && (
              <button
                onClick={() => openModal(title, imgSrc)}
                type="button"
                className={clsx(styles.button, 'f-16')}
                disabled
              >
                Пополнить
              </button>
            )}
          </div>
        </div>
      </article>
    </ComponentWithBorder>
  );
};

export default CurrencyCard;
