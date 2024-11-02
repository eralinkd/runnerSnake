import clsx from 'clsx';
import Modal from '../../../../shared/Modal/Modal';
import HistoryModalState from '../../../../state/historyModalState';
import styles from './HistoryModal.module.scss';

const HistoryModal = () => {
  const isOpen = HistoryModalState((state) => state.isOpen);
  const closeModal = HistoryModalState((state) => state.closeModal);
  const { title, imgSrc } = HistoryModalState((state) => state.modalData);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.modal}>
        <Modal.Close onClick={handleClose} className={styles.close} />
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={clsx('f-10', styles.infoItem)}>16/09/2024</div>
            <div className={clsx('f-10', styles.infoItem)}>7:03</div>
            <div className={clsx('f-10', styles.infoItem)}>SWAP</div>
          </div>
          <h2 className={clsx(styles.title, 'f-18')}>Вывод средств</h2>
          <div className={styles.line}>
            <div className={styles.currency}>
              <div className={styles.currencyImage}>
                <img src={imgSrc} alt={title} />
              </div>
              <div className={styles.currencyName}>{title}</div>
            </div>
            <div className={styles.wallet}>
              <span className="f-10">1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;
