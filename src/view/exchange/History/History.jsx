import HistoryCard from './HistoryCard/HistoryCard';
import HistoryModal from './HistoryModal/HistoryModal';
import { Select } from '../../../shared/Select/Select';
import { historySort } from '../../../constants/filterModels.js';
import styles from './History.module.scss';

const History = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* <button
            style={{ '--border-gradient': gradient }}
            className={styles.filter}
          >
            <div className={styles.btnContent}>
              Сортировать <img src={arrow} alt="arrow bottom" />{' '}
            </div>
          </button> */}
          <Select
            label="Сортировать"
            options={historySort}
            value={''}
            onSelect={(option) => console.log(option)}
          />
          <ul className={styles.list}>
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
          </ul>
        </div>
      </section>
      <HistoryModal />
    </>
  );
};

export default History;
