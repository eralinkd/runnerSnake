import clsx from 'clsx';
import styles from './CurrencyCardInfo.module.scss';

const CurrencyCardInfo = ({ imgSrc, title, text, className }) => {
  return (
    <div className={clsx(styles.currency, className)}>
      <div className={styles.imgContainer}>
        <img src={imgSrc} alt={title} />
      </div>
      <div className={styles.currencyInfo}>
        <h2 className={styles.currencyName}>{title}</h2>
        {text && (
          <span className={clsx(styles.currencyType, 'f-10')}>{text}</span>
        )}
      </div>
    </div>
  );
};

export default CurrencyCardInfo;
