import styles from './History.module.scss';
import HistoryCard from './HistoryCard/HistoryCard';

const History = () => {
  return (
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
  );
};

export default History;
