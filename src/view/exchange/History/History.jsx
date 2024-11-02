import HistoryCard from './HistoryCard/HistoryCard';
import arrow from '../../../assets/arrow-bottom.svg';
import HistoryModal from './HistoryModal/HistoryModal';
import styles from './History.module.scss';

const History = () => {
  const gradient =
    'linear-gradient(106.24deg, rgb(92, 106, 196) -3.53%, rgb(156, 39, 176) 117.96%)';

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <button
            style={{ '--border-gradient': gradient }}
            className={styles.filter}
          >
            <div className={styles.btnContent}>
              Сортировать <img src={arrow} alt="arrow bottom" />{' '}
            </div>
          </button>
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
