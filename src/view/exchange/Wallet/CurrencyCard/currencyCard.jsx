import { useEffect, useState } from 'react';
import clsx from 'clsx';
import dots from '../../../../assets/dots.svg';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import replenishModalState from '../../../../state/replenishModalState';
import withdrawModalState from '../../../../state/withdrawModalState';
import styles from './CurrencyCard.module.scss';

const gradients = {
  purple: 'linear-gradient(106.24deg, #5C6AC4 -3.53%, #9C27B0 117.96%)',
  yellow: 'linear-gradient(90deg, #f7b733, #fc4a1a)',
  green: 'linear-gradient(90deg, #56ab2f, #a8e063)',
  blue: 'linear-gradient(90deg, #36d1dc, #5b86e5)',
};

const CurrencyCard = ({ title, type, imgSrc, color }) => {
  const [show, setShow] = useState(false);
  const openModal = replenishModalState((state) => state.openModal);
  const openWithDrawModal = withdrawModalState((state) => state.openModal);

  const gradientStyle = gradients[color] || gradients.purple;

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
          <button
            onClick={withdrawModalOpen}
            type="button"
            className={clsx(styles.button, 'f-16', styles.darkButton)}
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
      </div>
    </article>
  );
};

export default CurrencyCard;
