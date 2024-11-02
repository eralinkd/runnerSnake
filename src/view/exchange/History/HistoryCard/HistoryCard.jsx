import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import dots from '../../../../assets/dots.svg';
import swap from '../../../../assets/swap-arrows.svg';
import bitcoin from '../../../../assets/bitcoin.png';
import styles from './HistoryCard.module.scss';
import clsx from 'clsx';
import withdrawHistoryModalState from '../../../../state/HistoryModalState';

const HistoryCard = () => {
  const openWithdrawModal = withdrawHistoryModalState(
    (state) => state.openModal
  );

  const openWithdraw = () => {
    openWithdrawModal();
  };

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
        <div className={clsx(styles.arrow)}>
          <img src={swap} alt="" />
        </div>
        <div className={styles.currencyContainer}>
          <CurrencyCardInfo
            className={styles.currencyInfo}
            title={'BITCOIN'}
            imgSrc={bitcoin}
            text={'Вывод средств'}
          />
          <button
            onClick={openWithdraw}
            type="button"
            className={styles.moreActions}
          >
            <img src={dots} alt="icon dots" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
