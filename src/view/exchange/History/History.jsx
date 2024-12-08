import HistoryCard from './HistoryCard/HistoryCard';
import HistoryModal from './HistoryModal/HistoryModal';
import { Select } from '../../../shared/Select/Select';
import { historySort } from '../../../constants/filterModels.js';
import { useEffect, useState } from 'react';
import { getHistory } from '../../../api/exchangeApi.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../shared/Spinner/Spinner';
import styles from './History.module.scss';

const History = () => {
  const [userId, setUserId] = useState(null);
  const [optionSelected, setOptionSelected] = useState(historySort[0].value);

  // Инициализация Telegram Web App
  useEffect(() => {
    const telegramInitData = window.Telegram.WebApp.initDataUnsafe;

    if (telegramInitData?.user?.id) {
      setUserId(telegramInitData.user.id);
    } else {
      console.error('Не удалось получить Telegram user.id');
    }
  }, []);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['history', userId, optionSelected],
    queryFn: () => getHistory(userId, optionSelected),
    // enabled: !!userId,
    keepPreviousData: true,
  });

  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          {isLoading && !isError && (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          )}
          {isError && (
            <div className={styles.container}>
              <p className="error">Failed to fetch data</p>
            </div>
          )}
          {history && (
            <>
              <Select
                label="Сортировать"
                options={historySort}
                value={optionSelected}
                onSelect={({ value }) => setOptionSelected(value)}
              />
              <ul className={styles.list}>
                {history?.map((item, idx) => (
                  <HistoryCard item={item} key={idx} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <HistoryModal />
    </>
  );
};

export default History;
