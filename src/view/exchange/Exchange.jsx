import Bitcoin from '../../assets/bitcoin.png';
import CurrencyCard from '../../shared/CurrencyCard/CurrencyCard';
import ReplenishModal from '../../shared/ReplenishModal/ReplenishModal';
import Scoin from '../../assets/scoin.png';
import Ton from '../../assets/ton.png';
import styles from './Exchange.module.scss';
import usdt from '../../assets/usdt.png';
import { useState } from 'react';
import clsx from 'clsx';
import WithdrawModal from '../../shared/WithdrawModal/WithdrawModal';

//временная переменная, потом с бд будет приходить
const cardsList = [
  {
    id: 1,
    color: 'purple',
    title: 'SCoin',
    type: 'token',
    cardType: '',
    imgSrc: Scoin,
  },
  {
    id: 2,
    color: 'yellow',
    title: 'BITCOIN',
    type: 'Coin',
    cardType: '',
    imgSrc: Bitcoin,
  },
  {
    id: 3,
    color: 'green',
    title: 'USDT',
    type: 'Coin',
    cardType: '',
    imgSrc: usdt,
  },
  {
    id: 4,
    color: 'blue',
    title: 'TON',
    type: 'Coin',
    cardType: '',
    imgSrc: Ton,
  },
];

const activeTabs = [
  { name: 'Кошелёк' },
  { name: 'Обмен' },
  { name: 'История' },
];

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('Кошелёк');

  return (
    <>
      <section className="section">
        <ul className={styles.nav}>
          {activeTabs.map((tab, index) => (
            <li
              key={index}
              className={clsx(
                'f-23 bold',
                activeTab === tab.name && styles.active
              )}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
        {activeTab === 'Кошелёк' && (
          <div className={styles.container}>
            <div className={styles.list}>
              {cardsList.map((card) => (
                <CurrencyCard
                  key={card.id}
                  title={card.title}
                  imgSrc={card.imgSrc}
                  type={card.type}
                  color={card.color}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'Обмен' && (
          <div className={styles.nothing}>Still nothing here</div>
        )}
        {activeTab === 'История' && (
          <div className={styles.nothing}>Still nothing here</div>
        )}
      </section>
      <ReplenishModal />
      <WithdrawModal />
    </>
  );
};

export default Exchange;
