import HistoryCard from './HistoryCard/HistoryCard';
import HistoryModal from './HistoryModal/HistoryModal';
import { Select } from '../../../shared/Select/Select';
import { historySort } from '../../../constants/filterModels.js';
import { useState } from 'react';
import { getHistory } from '../../../api/exchangeApi.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../shared/Spinner/Spinner';
import styles from './History.module.scss';

const History = () => {
  const [optionSelected, setOptionSelected] = useState(null);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['history'],
    queryFn: getHistory,
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
