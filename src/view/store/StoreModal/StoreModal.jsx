import storeModalState from '../../../state/StoreModalState.js';
import Modal from '../../../shared/Modal/Modal.jsx';
import snakeIcon from '../../../assets/snake.svg';
// import usdtIcon from '../../../assets/usdt-white.svg';
// import clsx from 'clsx';
import styles from './StoreModal.module.scss';

const StoreModal = () => {
  const isOpen = storeModalState((state) => state.isOpen);
  const closeModal = storeModalState((state) => state.closeModal);
  const { title } = storeModalState((state) => state.modalData);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <Modal.Close onClick={handleClose} className={styles.close} />
          <h2 className={styles.title}>Купить этот товар?</h2>
          <h4 className={styles.productName}>{title}</h4>
          <div className={styles.prices}>
            <div className={styles.price}>
              <img src={snakeIcon} alt="icon" />
              <span className={styles.value}>123K</span>
            </div>
            {/* <div className={styles.price}>
              <img src={usdtIcon} alt="icon" />
              <span className={styles.value}>123K</span>
            </div> */}
          </div>
        </div>
        <button type="button" className={styles.button}>
          Подтвердить
        </button>
      </div>
    </Modal>
  );
};

export default StoreModal;
