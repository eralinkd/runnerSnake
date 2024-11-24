import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../../../../shared/Modal/Modal';
import HistoryModalState from '../../../../state/historyModalState';
import copy from '../../../../assets/copy.svg';
import styles from './HistoryModal.module.scss';

const HistoryModal = () => {
  const [isCopy, setIsCopy] = useState(false);

  const isOpen = HistoryModalState((state) => state.isOpen);
  const closeModal = HistoryModalState((state) => state.closeModal);
  const { title, imgSrc, operation } = HistoryModalState(
    (state) => state.modalData
  );

  const currentOperation =
    operation === 'WITHDRAW'
      ? 'Вывод средств'
      : operation === 'SWAP'
      ? 'Обмен'
      : 'Пополнение';

  const handleCopy = () => {
    setIsCopy(true);
    navigator.clipboard.writeText('1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB');
  };

  const handleClose = () => {
    closeModal();
    setIsCopy(false);
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
          <h2 className={clsx(styles.title, 'f-18')}>{currentOperation}</h2>
          <div className={styles.line}>
            <div className={styles.currency}>
              <div className={styles.currencyImage}>
                <img src={imgSrc} alt={title} />
              </div>
              <div className={styles.currencyName}>{title}</div>
            </div>
            <div className={styles.walletContainer}>
              <span className={clsx('f-10', styles.wallet)}>
                1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB
              </span>
              <button
                className={styles.copyButton}
                type="button"
                onClick={handleCopy}
              >
                <span className="f-10">
                  {isCopy ? 'Скопировано' : 'Копировать'}
                </span>
                <img src={copy} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;
