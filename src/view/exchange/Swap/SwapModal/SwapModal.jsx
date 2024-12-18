import Modal from '../../../../shared/Modal/Modal.jsx';
import clsx from 'clsx';
import styles from './SwapModal.module.scss';
import swapModalState from '../../../../state/SwapModalState.js';

const SwapModal = () => {
    const isOpen = swapModalState((state) => state.isOpen);
    const closeModal = swapModalState((state) => state.closeModal);
    const { title, imgSrc, amount } = swapModalState((state) => state.modalData);
    console.log(title, imgSrc, amount);
    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal handleClose={handleClose} isOpen={isOpen}>
            <div className={styles.replenish}>
                <Modal.Close onClick={handleClose} className={styles.close} />
                <div className={styles.contentWrapper}>
                    <div className={styles.text}>
                        <h2 className={clsx(styles.title, 'f-18')}>Успешный обмен</h2>
                        <div className={styles.currency}>
                            <div className={styles.currencyImage}>
                                <img src={imgSrc} alt={title} />
                            </div>
                            <div className={styles.currencyName}>
                                <p>{title}</p>
                                <p className={styles.amount}>{amount.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgContainer}></div>
                </div>
            </div>
        </Modal>
    );
};

export default SwapModal;
