import clsx from 'clsx';
import styles from './AmountDisplay.module.scss'; // Подключите стили

const AmountDisplay = ({ amount, operationType, className }) => {
  const [integerPart, decimalPart] = amount.toString().split('.');

  const getColorByOperation = (type) => {
    switch (type) {
      case 'WITHDRAW':
        return 'rgba(255, 0, 0, 1)';
      case 'REPLENISHMENT':
        return 'rgba(0, 254, 30, 1)';
      default:
        return 'white';
    }
  };

  const color = getColorByOperation(operationType);

  return (
    <div className={clsx(styles.amountDisplay, className)} style={{ color }}>
      <span className={styles.integerPart}>{integerPart}</span>
      <span className={styles.decimalPart}>.{decimalPart}</span>
    </div>
  );
};

export default AmountDisplay;
