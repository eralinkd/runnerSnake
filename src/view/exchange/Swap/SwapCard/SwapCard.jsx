import arrow from '../../../../assets/arrow-bottom.svg';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
// import clsx from 'clsx';
import styles from './SwapCard.module.scss';

const SwapCard = ({ props }) => {
  const gradient = props.gradient;

  return (
    <article
      className={styles.article}
      style={{ '--border-gradient': gradient }}
    >
      <p>dsds</p>
      <div className={styles.currencyContainer}>
        <CurrencyCardInfo
          className={styles.currencyInfo}
          title={props.coin}
          imgSrc={props.coinImg}
          text={'Token'}
        ></CurrencyCardInfo>
        <button type="button" className={styles.moreActions}>
          <img src={arrow} alt="icon dots" />
        </button>
      </div>
    </article>
  );
};

export default SwapCard;
