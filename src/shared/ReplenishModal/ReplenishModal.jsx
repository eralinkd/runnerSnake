import clsx from 'clsx';
import replenishModalState from '../../state/replenishModalState.js';
import Modal from '../Modal/Modal.jsx';
import styles from './ReplenishModal.module.scss';

const ReplenishModal = () => {
  const close = replenishModalState((state) => state.close);
  const isOpen = replenishModalState((state) => state.isOpen);

  const handleCopy = () => {
    navigator.clipboard.writeText('1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB');
    // close();
  };

  if (!isOpen) return null;

  return (
    <Modal handleClose={close} isOpen={isOpen}>
      <div className={styles.replenish}>
        <Modal.Close onClick={close} className={styles.close} />
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={clsx(styles.title, 'f-18')}>Пополнение</h2>
            <div className={styles.currency}>
              <div className={styles.currencyImage}></div>
              <div className={styles.currencyName}>USDT</div>
            </div>
          </div>
          <div className={styles.imgContainer}></div>
        </div>
        <div className={styles.link}>
          <span className="f-10">1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
          <button className="f-10" type="button" onClick={handleCopy}>
            Копировать
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReplenishModal;
