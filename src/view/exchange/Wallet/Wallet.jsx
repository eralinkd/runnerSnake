import CurrencyCard from './CurrencyCard/CurrencyCard';
import ReplenishModal from './ReplenishModal/ReplenishModal';
import WithdrawModal from './WithdrawModal/WithdrawModal';
import { fetchCryptos } from '../../../api/exchangeApi';
import styles from './Wallet.module.scss';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../shared/Spinner/Spinner';
import { getUser } from '../../../api/userApi';
import { useEffect, useState } from 'react';

const Wallet = () => {
  const [balances, setBalance] = useState(null);

  const {
    data: cryptos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
  });

  const { data: balancesResponse, isError: isBalancesError } = useQuery({
    queryKey: ['balances'],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!isBalancesError) setBalance(balancesResponse?.balances);
  }, [balancesResponse]);

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
            {cryptos.map((currency) => {
              const amount = balances?.[currency.apiName];
              return (
                <CurrencyCard
                  key={currency.fullName}
                  item={currency}
                  amount={amount}
                />
              );
            })}
          </div>
        )}
      </div>
      <ReplenishModal />
      <WithdrawModal />
    </>
  );
};

export default Wallet;
