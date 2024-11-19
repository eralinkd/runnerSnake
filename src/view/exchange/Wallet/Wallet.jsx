import CurrencyCard from './CurrencyCard/CurrencyCard';
import ReplenishModal from './ReplenishModal/ReplenishModal';
import WithdrawModal from './WithdrawModal/WithdrawModal';
import { fetchCryptos } from '../../../api/exchangeApi';
import styles from './Wallet.module.scss';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../shared/Spinner/Spinner';

const Wallet = () => {
  const {
    data: cryptos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
  });

  return (
    <>
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
        {cryptos && !isError && (
          <div className={styles.list}>
            {cryptos.map((currency) => (
              <CurrencyCard key={currency.fullName} item={currency} />
            ))}
          </div>
        )}
      </div>
      <ReplenishModal />
      <WithdrawModal />
    </>
  );
};

export default Wallet;
