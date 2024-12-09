import { useState } from 'react';
import HistoryCard from './HistoryCard/HistoryCard';
import HistoryModal from './HistoryModal/HistoryModal';
import { Select } from '../../../shared/Select/Select';
import Spinner from '../../../shared/Spinner/Spinner';
import { getHistory } from '../../../api/exchangeApi.js';
import styles from './History.module.scss';
import { useQuery } from '@tanstack/react-query';
import { historySort } from '../../../constants/constants.js';

const History = () => {
  const [optionSelected, setOptionSelected] = useState(historySort[0].value);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['history', optionSelected],
    queryFn: () => getHistory(optionSelected),
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
          {history?.length && (
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
