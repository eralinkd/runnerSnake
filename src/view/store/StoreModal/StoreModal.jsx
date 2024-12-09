import { useEffect, useState } from 'react';
import storeModalState from '../../../state/StoreModalState.js';
import Modal from '../../../shared/Modal/Modal.jsx';
import snakeIcon from '../../../assets/snake.svg';
import purchaseIcon from '../../../assets/store/purchase.svg';
// import usdtIcon from '../../../assets/usdt-white.svg';
// import clsx from 'clsx';
import styles from './StoreModal.module.scss';
import { useMutation } from '@tanstack/react-query';
import { buyProduct } from '../../../api/storeApi.js';
import { useRef } from 'react';

const StoreModal = () => {
  const [userId, setUserId] = useState(null);
  const isOpen = storeModalState((state) => state.isOpen);
  const closeModal = storeModalState((state) => state.closeModal);
  const { title } = storeModalState((state) => state.modalData);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const telegramInitData = window.Telegram.WebApp.initDataUnsafe;

    if (telegramInitData?.user?.id) {
      setUserId(telegramInitData.user.id); // Устанавливаем userId из Telegram
    }

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

  const handleBuyProduct = () => {
    mutate({
      userId: userId,
      currency: 'SCOIN',
      productName: title,
    });
  };

  const renderContent = () => {
    if (!response && !isError) {
      return (
        <>
          <h2 className={styles.title}>Купить этот товар?</h2>
          <h4 className={styles.productName}>{title}</h4>
          <div className={styles.prices}>
            <div className={styles.price}>
              <img src={snakeIcon} alt="icon" />
              <span className={styles.value}>123K</span>
            </div>
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
        <>
          <img src={purchaseIcon} alt="purchase" />
          <h2 className={styles.title}>Товар добавлен!</h2>
        </>
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
            {!isError && (
              <button
                type="button"
                onClick={handleBuyProduct}
                className={styles.button}
              >
                {isPending ? 'Покупаем...' : 'Подтвердить'}
              </button>
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
