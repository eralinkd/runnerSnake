import clsx from 'clsx';
import replenishModalState from '../../../../state/replenishModalState.js';
import Modal from '../../../../shared/Modal/Modal.jsx';
import { useState } from 'react';
import styles from './ReplenishModal.module.scss';

const ReplenishModal = () => {
  const [isCopy, setIsCopy] = useState(false);

  const isOpen = replenishModalState((state) => state.isOpen);
  const closeModal = replenishModalState((state) => state.closeModal);
  const { title, imgSrc } = replenishModalState((state) => state.modalData);

  const handleCopy = () => {
    setIsCopy(true);
    navigator.clipboard.writeText('1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB');
  };

  const handleClose = () => {
    setIsCopy(false);
    closeModal();
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.replenish}>
        <Modal.Close onClick={handleClose} className={styles.close} />
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={clsx(styles.title, 'f-18')}>Пополнение</h2>
            <div className={styles.currency}>
              <div className={styles.currencyImage}>
                <img src={imgSrc} alt={title} />
              </div>
              <div className={styles.currencyName}>{title}</div>
            </div>
          </div>
          <div className={styles.imgContainer}></div>
        </div>
        <div className={styles.link}>
          <span className="f-10">1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
          <button className="f-10" type="button" onClick={handleCopy}>
            {isCopy ? 'Скопировано' : 'Копировать'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReplenishModal;
