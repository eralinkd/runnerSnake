import StoreCard from './StoreCard/StoreCard';
import testImage from '../../assets/store/tets.png';
import styles from './Store.module.scss';
import StoreModal from './StoreModal/StoreModal';

const data = [
  {
    title: 'Шлем',
    SCoinPrice: 10,
    OtherPrice: 123,
    imgSrc: testImage,
  },
  {
    title: 'Кольчуга',
    SCoinPrice: 10,
    OtherPrice: 123,
    imgSrc: testImage,
  },
  {
    title: 'Кольчуга',
    SCoinPrice: 10,
    OtherPrice: 123,
    imgSrc: testImage,
  },
];

const Store = () => {
  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {data?.map((card) => (
          <StoreCard key={card.title} card={card} />
        ))}
      </ul>
      <StoreModal />
    </section>
  );
};

export default Store;
