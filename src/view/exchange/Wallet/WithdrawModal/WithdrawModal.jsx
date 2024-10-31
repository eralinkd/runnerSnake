import clsx from 'clsx';
import withdrawModalState from '../../../../state/withdrawModalState';
import Modal from '../../../../shared/Modal/Modal';
import styles from './WithdrawModal.module.scss';

const WithdrawModal = () => {
  const isOpen = withdrawModalState((state) => state.isOpen);
  const closeModal = withdrawModalState((state) => state.closeModal);
  const { title, imgSrc } = withdrawModalState((state) => state.modalData);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.withdraw}>
        <Modal.Close onClick={handleClose} className={styles.close} />
        <div className={styles.content}>
          <h2 className={clsx(styles.title, 'f-18')}>Вывод средств</h2>
          <div className={styles.fields}>
            <div className={styles.line}>
              <div className={styles.currency}>
                <div className={styles.currencyImage}>
                  <img src={imgSrc} alt={title} />
                </div>
                <div className={styles.currencyName}>{title}</div>
              </div>
              <input
                className={clsx(styles.field, 'f-10')}
                type="number"
                placeholder="Введите сумму..."
              />
            </div>
            <textarea
              className={clsx(styles.field, 'f-10', styles.fullField)}
              placeholder="Введите кошелёк..."
            />
          </div>
          <button type="button" className={styles.button}>
            Вывести
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
