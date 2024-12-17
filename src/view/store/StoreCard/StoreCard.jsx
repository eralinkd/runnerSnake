import ComponentWithBorder from '../../../shared/ComponentWithBorder/ComponentWithBorder.jsx';
import snakeIcon from '../../../assets/snake.svg';
// import usdtIcon from '../../../assets/usdt-white.svg';
import testImage from '../../../assets/store/tets.png';
import arrow from '../../../assets/taskArrowToRight.svg';
import styles from './StoreCard.module.scss';
import storeModalState from '../../../state/StoreModalState.js';

const StoreCard = ({ card }) => {
  const { name } = card;
  const openModal = storeModalState((state) => state.openModal);

  return (
    <ComponentWithBorder className={styles.cardWrapper}>
      <article className={styles.card}>
        <button
          type="button"
          onClick={() => openModal(name)}
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
            <div className={styles.price}>
              <img src={snakeIcon} alt="icon" />
              <span className={styles.value}>10</span>
            </div>
            {/* <div className={styles.price}>
              <img src={usdtIcon} alt="icon" />
              <span className={styles.value}>123K</span>
            </div> */}
          </div>
        </div>
      </article>
    </ComponentWithBorder>
  );
};

export default StoreCard;
