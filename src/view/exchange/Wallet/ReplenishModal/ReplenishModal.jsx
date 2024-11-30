import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { replenishBalance } from '../../../../api/exchangeApi.js';
import replenishModalState from '../../../../state/replenishModalState.js';
import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo.jsx';
import Modal from '../../../../shared/Modal/Modal.jsx';
import copy from '../../../../assets/copy.svg';
import clsx from 'clsx';
import styles from './ReplenishModal.module.scss';

const ReplenishModal = () => {
  const [isCopy, setIsCopy] = useState(false);
  const [amount, setAmount] = useState(0);

  const isOpen = replenishModalState((state) => state.isOpen);
  const closeModal = replenishModalState((state) => state.closeModal);
  const { title, imgSrc } = replenishModalState((state) => state.modalData);

  const {
    mutate,
    isError,
    error,
    isPending,
    isSuccess,
    data: response,
  } = useMutation({
    mutationFn: (data) => replenishBalance(data),
    onSuccess: (response) => {
      console.log('Withdrawal successful:', response);
    },
    onError: (error) => {
      console.error('Error withdrawing funds:', error);
    },
  });

  const handleCopy = () => {
    setIsCopy(true);
    navigator.clipboard.writeText('1Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB');
  };

  const handleClose = () => {
    setIsCopy(false);
    closeModal();
  };

  const handleReplenish = () => {
    mutate({
      crypto: title,
      amount: Number(amount),
    });
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.replenish}>
        <Modal.Close onClick={handleClose} className={styles.close} />
        {isSuccess ? (
          <div className={styles.contentWrapper}>
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
              <span className="f-10">{response.address}</span>
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
        ) : (
          <div className={styles.firstContentWrapper}>
            <h2 className={clsx(styles.title, 'f-18')}>Пополнение</h2>
            <div className={styles.fields}>
              <div className={styles.line}>
                <CurrencyCardInfo title={title} imgSrc={imgSrc} />
                <input
                  className={clsx(styles.field, 'f-10')}
                  type="number"
                  placeholder="Введите сумму..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              {isError && <div className={styles.error}>{error.message}</div>}
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleReplenish}
              disabled={isPending}
            >
              {isPending ? 'Загрузка...' : 'Пополнить'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReplenishModal;
