import Bitcoin from '../../../../assets/bitcoin.png';
import SCoin from '../../../../assets/scoin.png';
import Ton from '../../../../assets/ton.png';
import Usdt from '../../../../assets/usdt.png';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import dots from '../../../../assets/dots.svg';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import replenishModalState from '../../../../state/replenishModalState';
import withdrawModalState from '../../../../state/withdrawModalState';
import styles from './CurrencyCard.module.scss';

const gradients = {
  SCoin: 'linear-gradient(106.24deg, #5C6AC4 -3.53%, #9C27B0 117.96%)',
  BTC: ' linear-gradient(90deg, #EA4335 0%, #FBBC05 100%)',
  USDT: 'linear-gradient(90deg, #107C10 0%, #5DC21E 100%)',
  TON: 'linear-gradient(90deg, #005FED 0%, #0099FF 100%)',
  Stars: 'linear-gradient(90deg, #EB001B 0%, #FF3333 100%)',
  default: 'linear-gradient(106.24deg, #5C6AC4 -3.53%, #9C27B0 117.96%)',
};

const currencyImages = {
  BTC: Bitcoin,
  SCoin: SCoin,
  TON: Ton,
  USDT: Usdt,
  default: SCoin,
};

const CurrencyCard = ({ item }) => {
  const { simpleName: title, type, swap, withdraw, replenishment } = item;
  const imgSrc = currencyImages[title] || currencyImages.default;

  const [show, setShow] = useState(false);
  const openModal = replenishModalState((state) => state.openModal);
  const openWithDrawModal = withdrawModalState((state) => state.openModal);

  const gradientStyle = gradients[title] || gradients.default;

  const replenishModalOpen = () => {
    openModal(title, imgSrc);
  };
  const withdrawModalOpen = () => {
    openWithDrawModal(title, imgSrc);
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <article className={styles.article}>
      <div
        className={styles.gradientBg}
        style={{ background: gradientStyle }}
      ></div>
      <div className={styles.content}>
        <CurrencyCardInfo
          className={styles.currencyCardInfo}
          title={title}
          imgSrc={imgSrc}
          text={type}
        />
        <div className={clsx(styles.actions, show && styles.hide)}>
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
        <div className={clsx(styles.buttons, show && styles.show)}>
          {swap && (
            <button type="button" className={clsx(styles.button, 'f-16')}>
              Обмен
            </button>
          )}
          {withdraw && (
            <button
              onClick={withdrawModalOpen}
              type="button"
              className={clsx(styles.button, 'f-16')}
            >
              Вывести
            </button>
          )}
          {replenishment && (
            <button
              onClick={replenishModalOpen}
              type="button"
              className={clsx(styles.button, 'f-16')}
            >
              Пополнить
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default CurrencyCard;
