import clsx from 'clsx';
import { useState } from 'react';
import withdrawModalState from '../../../../state/withdrawModalState';
import Modal from '../../../../shared/Modal/Modal';
import styles from './WithdrawModal.module.scss';
import { withdrawBalance } from '../../../../api/exchangeApi';
import { useMutation } from '@tanstack/react-query';

const WithdrawModal = () => {
  const isOpen = withdrawModalState((state) => state.isOpen);
  const closeModal = withdrawModalState((state) => state.closeModal);
  const { title, imgSrc } = withdrawModalState((state) => state.modalData);

  // Состояние для полей суммы и адреса
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  // Функция для закрытия модального окна
  const handleClose = () => {
    closeModal();
  };

  const mutation = useMutation({
    mutationFn: (data) => withdrawBalance(data),
    onSuccess: (response) => {
      console.log('Withdrawal successful:', response);
      closeModal();
    },
    onError: (error) => {
      console.error('Error withdrawing funds:', error);
    },
  });

  // Функция для отправки запроса на вывод средств
  const handleWithdraw = async () => {
    const data = {
      crypto: title,
      amount: parseFloat(amount),
      address: address,
    };
    mutation.mutate(data);
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <textarea
              className={clsx(styles.field, 'f-10', styles.fullField)}
              placeholder="Введите кошелёк..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={handleWithdraw}
          >
            Вывести
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
