import { useEffect, useState } from 'react';
import storeModalState from '../../../state/StoreModalState.js';
import Modal from '../../../shared/Modal/Modal.jsx';
import snakeIcon from '../../../assets/snake.svg';
import purchaseIcon from '../../../assets/store/purchase.svg';
import usdtIcon from '../../../assets/usdt-white.svg';
// import clsx from 'clsx';
import useStore from '../../../state/Store.js';
import { useMutation } from '@tanstack/react-query';
import { buyProduct } from '../../../api/storeApi.js';
import { useRef } from 'react';
import styles from './StoreModal.module.scss';

const StoreModal = () => {
  const { userId } = useStore.getState();
  const isOpen = storeModalState((state) => state.isOpen);
  const closeModal = storeModalState((state) => state.closeModal);
  const { title, prices, id } = storeModalState((state) => state.modalData);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const {
    mutate,
    isPending,
    isError,
    data: response,
    reset,
  } = useMutation({
    mutationFn: (data) => buyProduct(data),
    onSuccess: (response) => {
      console.log('Withdrawal successful:', response);
    },
    onError: (error) => {
      console.error('Error withdrawing funds:', error);
    },
  });

  const handleClose = () => {
    closeModal();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      reset();
      timeoutRef.current = null;
    }, 300);
  };

  const handleBuyProduct = (currency) => {
    mutate({
      userId: userId,
      currency: currency,
      productName: id,
    });
  };

  const renderContent = () => {
    if (!response && !isError) {
      return (
        <>
          <h2 className={styles.title}>
            {isPending ? 'Покупаем...' : 'Купить этот товар?'}
          </h2>
          <h4 className={styles.productName}>{title}</h4>
          <div className={styles.prices}>
            {Object.entries(prices || {}).map(([key, value]) => (
              <div key={key} className={styles.price}>
                <img
                  src={key === 'USDT_TRC20' ? usdtIcon : snakeIcon}
                  alt="icon"
                />
                <span className={styles.value}>{value}</span>
              </div>
            ))}
          </div>
        </>
      );
    }
    if (isError) {
      return (
        <div className={styles.error}>
          <h2>Упс... что-то пошло не так</h2>
          <p>повторите попытку или попробуйте пожалуйста позже</p>
        </div>
      );
    }

    if (response.success) {
      return (
        <div className={styles.success}>
          <img src={purchaseIcon} alt="purchase" />
          <h2 className={styles.title}>Товар добавлен!</h2>
        </div>
      );
    }

    return (
      <div className={styles.fail}>
        <h2 className={styles.title}>Недостаточно средств</h2>
        <p>Заработайте в игре или обменяйте на бирже</p>
      </div>
    );
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <Modal.Close onClick={handleClose} className={styles.close} />
          {renderContent()}
        </div>
        {!response ? (
          <>
            {!isError && prices && Object.keys(prices).length > 0 && (
              <div className={styles.buttons}>
                {Object.keys(prices).map((currency) => (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => handleBuyProduct(currency)}
                    className={styles.button}
                  >
                    {`Купить за ${
                      currency === 'USDT_TRC20' ? 'USDT' : 'SCOIN'
                    }`}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <button type="button" onClick={handleClose} className={styles.button}>
            OK
          </button>
        )}
      </div>
    </Modal>
  );
};

export default StoreModal;
