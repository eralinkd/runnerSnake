import Modal from '../../../../shared/Modal/Modal';
import styles from './EggModal.module.scss';
import eggModalState from '../../../../state/eggModalState';

const EggModal = () => {
  const { isOpen, success, closeModal } = eggModalState((state) => state);

  return (
    <Modal isOpen={isOpen} handleClose={closeModal}>
      <div className={styles.modal}>
        <Modal.Close onClick={closeModal} className={styles.close} />
        {success ? (
          <div className={styles.success}>
            <h2 className={styles.title}>Награда успешно забрана!</h2>
          </div>
        ) : (
          <div className={styles.error}>
            <h2 className={styles.title}>Не удалось забрать награду</h2>
            <p>Попробуйте позже</p>
          </div>
        )}
        <button type="button" onClick={closeModal} className={styles.button}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default EggModal;
