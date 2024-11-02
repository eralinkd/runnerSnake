import styles from './History.module.scss';
import HistoryCard from './HistoryCard/HistoryCard';
import HistoryModal from './HistoryModal/HistoryModal';

const History = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className="filter"></div>
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
