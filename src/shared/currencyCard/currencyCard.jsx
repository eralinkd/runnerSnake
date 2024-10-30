import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './CurrencyCard.module.scss';
import dots from '../../assets/dots.svg';
import replenishModalState from '../../state/replenishModalState';
import CurrencyCardInfo from './CurrencyCardInfo/CurrencyCardInfo';

const gradients = {
  purple: 'linear-gradient(90deg, #ff8a00, #8e2de2)',
  yellow: 'linear-gradient(90deg, #f7b733, #fc4a1a)',
  green: 'linear-gradient(90deg, #56ab2f, #a8e063)',
  blue: 'linear-gradient(90deg, #36d1dc, #5b86e5)',
};

const CurrencyCard = ({ title, type, imgSrc, color }) => {
  const [show, setShow] = useState(false);
  const openModal = replenishModalState((state) => state.openModal);

  const gradientStyle = gradients[color] || gradients.purple;

  const replenishModalOpen = () => {
    openModal(title, imgSrc);
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

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
          type={type}
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
      </div>
    </article>
  );
};

export default CurrencyCard;
