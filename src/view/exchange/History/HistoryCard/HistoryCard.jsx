import CurrencyCardInfo from '../../../../shared/CurrencyCard/CurrencyCardInfo/CurrencyCardInfo';
import dots from '../../../../assets/dots.svg';
import bitcoin from '../../../../assets/bitcoin.png';
import styles from './HistoryCard.module.scss';
import clsx from 'clsx';

const HistoryCard = () => {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={clsx('f-10', styles.infoItem)}>16/09/2024</div>
          <div className={clsx('f-10', styles.infoItem)}>7:03</div>
          <div className={clsx('f-10', styles.infoItem)}>SWAP</div>
        </div>
        <div className={styles.value}>
          <span className="f-28">792045.89</span>
        </div>
        <div className={clsx(styles.arrow)}>---</div>
        <div className={styles.currencyContainer}>
          <CurrencyCardInfo
            className={styles.currencyInfo}
            title={'USDT'}
            imgSrc={bitcoin}
            text={'Пополнение'}
          />
          <button type="button" className={styles.moreActions}>
            <img src={dots} alt="icon dots" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
