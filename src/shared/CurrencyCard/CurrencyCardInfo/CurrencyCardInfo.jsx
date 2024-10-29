import clsx from 'clsx';
import styles from './CurrencyCardInfo.module.scss';

const CurrencyCardInfo = ({ imgSrc, title, type, className }) => {
  return (
    <div className={clsx(styles.currency, className)}>
      <div className={styles.imgContainer}>
        <img src={imgSrc} alt={title} />
      </div>
      <div className={styles.currencyInfo}>
        <h2 className={clsx(styles.currencyName, 'f-18')}>{title}</h2>
        <span className={clsx(styles.currencyType, 'f-10')}>{type}</span>
      </div>
    </div>
  );
};

export default CurrencyCardInfo;
