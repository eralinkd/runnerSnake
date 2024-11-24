import dots from '../../../../assets/dots.svg';
import swap from '../../../../assets/swap-arrows.svg';
import clsx from 'clsx';
import historyModalState from '../../../../state/HistoryModalState';
import { currencyImages } from '../../../../constants/currency';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import styles from './HistoryCard.module.scss';
import AmountDisplay from '../../../../shared/AmountDisplay/AmountDisplay';

const HistoryCard = ({ item }) => {
  const { paymentType, crypto, createAt, amount } = item;
  const imgSrc = currencyImages[crypto] || currencyImages.default;
  const [date, time] = createAt.split(' ');
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = time;

  const openHistoryModal = historyModalState((state) => state.openModal);

  const openWithdraw = () => {
    openHistoryModal(crypto, imgSrc, paymentType);
  };

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={clsx('f-10', styles.infoItem)}>{formattedDate}</div>
          <div className={clsx('f-10', styles.infoItem)}>{formattedTime}</div>
          {paymentType && (
            <div className={clsx('f-10', styles.infoItem)}>{paymentType}</div>
          )}
        </div>
        <div className={styles.value}>
          <AmountDisplay
            amount={amount.toFixed(2)}
            operationType={paymentType}
          />
        </div>
        {paymentType === 'SWAP' && (
          <div className={clsx(styles.arrow)}>
            <img src={swap} alt="" />
          </div>
        )}
        <div className={styles.currencyContainer}>
          <CurrencyCardInfo
            className={styles.currencyInfo}
            title={crypto}
            imgSrc={imgSrc}
            text={
              paymentType === 'WITHDRAW'
                ? 'Вывод средств'
                : paymentType === 'SWAP'
                ? 'Обмен'
                : 'Поплнение'
            }
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
