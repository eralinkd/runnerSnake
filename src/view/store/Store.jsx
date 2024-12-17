import StoreCard from './StoreCard/StoreCard';
import styles from './Store.module.scss';
import StoreModal from './StoreModal/StoreModal';
import { fetchProducts } from '../../api/storeApi';
import Spinner from '../../shared/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';

const Store = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <section className={styles.section}>
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
      {data && !isError && (
        <ul className={styles.list}>
          {data.map((card) => (
            <StoreCard key={card.title} card={card} />
          ))}
        </ul>
      )}
      <StoreModal />
    </section>
  );
};

export default Store;
