import ComponentWithBorder from '../../../shared/ComponentWithBorder/ComponentWithBorder.jsx';
import snakeIcon from '../../../assets/snake.svg';
import usdtIcon from '../../../assets/usdt-white.svg';
import testImage from '../../../assets/store/tets.png';
import arrow from '../../../assets/taskArrowToRight.svg';
import styles from './StoreCard.module.scss';
import storeModalState from '../../../state/StoreModalState.js';
import clsx from 'clsx';

const StoreCard = ({ card }) => {
  const { name, prices, id, available } = card;
  const openModal = storeModalState((state) => state.openModal);

  return (
    <ComponentWithBorder
      className={clsx(styles.cardWrapper, !available && styles.unavailable)}
    >
      <article className={clsx(styles.card, !available && styles.unavailable)}>
        <span>Недоступно!</span>
        <button
          type="button"
          onClick={() => openModal(name, prices, id)}
          className={styles.btn}
        >
          <img src={arrow} alt="arrow" className={styles.img} />
        </button>
        <div className={styles.imgContainer}>
          <img src={testImage} alt="card" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.actions}>
            {Object.entries(prices)?.map(([key, value]) => (
              <div key={key} className={styles.price}>
                <img
                  src={key === 'USDT_TRC20' ? usdtIcon : snakeIcon}
                  alt="icon"
                />
                <span className={styles.value}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </ComponentWithBorder>
  );
};

export default StoreCard;
