import clsx from 'clsx';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  validatePaymentAddress,
  withdrawBalance,
} from '../../../../api/exchangeApi';
import withdrawModalState from '../../../../state/withdrawModalState';
import Modal from '../../../../shared/Modal/Modal';
import styles from './WithdrawModal.module.scss';

const WithdrawModal = () => {
  const isOpen = withdrawModalState((state) => state.isOpen);
  const closeModal = withdrawModalState((state) => state.closeModal);
  const { title, imgSrc } = withdrawModalState((state) => state.modalData);

  // Состояние для полей ввода и ошибки
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    closeModal();
  };

  const withdrawMutation = useMutation({
    mutationFn: (data) => withdrawBalance(data),
    onSuccess: (response) => {
      console.log('Withdrawal successful:', response);
      closeModal();
    },
    onError: (error) => {
      console.error('Error withdrawing funds:', error);
      setError('Ошибка при выводе средств. Попробуйте еще раз.');
    },
  });

  // Функция для проверки адреса и выполнения запроса на вывод средств
  const handleWithdraw = async () => {
    setError(''); // Очистить предыдущие ошибки
    setIsLoading(true); // Включить состояние загрузки

    // Проверка полей
    if (!amount || parseFloat(amount) <= 0) {
      setError('Введите корректную сумму.');
      setIsLoading(false);
      return;
    }
    if (!address) {
      setError('Введите адрес кошелька.');
      setIsLoading(false);
      return;
    }

    try {
      const validationResponse = await validatePaymentAddress({
        crypto: title,
        address: address,
      });

      if (!validationResponse.result) {
        setError('Адрес кошелька недействителен.');
        setIsLoading(false);
        return;
      }

      const withdrawData = {
        crypto: title,
        amount: parseFloat(amount),
        address: address,
      };
      withdrawMutation.mutate(withdrawData);
    } catch (err) {
      console.error('Validation error:', err);
      setError('Ошибка при проверке адреса. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
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
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={handleWithdraw}
            disabled={isLoading}
          >
            Вывести
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
