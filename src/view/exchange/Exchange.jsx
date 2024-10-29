import Bitcoin from '../../assets/bitcoin.png';
import CurrencyCard from '../../shared/currencyCard/CurrencyCard';
import ReplenishModal from '../../shared/ReplenishModal/ReplenishModal';
import Scoin from '../../assets/scoin.png';
import Ton from '../../assets/ton.png';
import styles from './Exchange.module.scss';
import usdt from '../../assets/usdt.png';
import { useState } from 'react';

const cardsList = [
  {
    id: 1,
    title: 'SCoin',
    type: 'token',
    cardType: '',
    imgSrc: Scoin,
  },
  {
    id: 2,
    title: 'BITCOIN',
    type: 'Coin',
    cardType: '',
    imgSrc: Bitcoin,
  },
  {
    id: 3,
    title: 'USDT',
    type: 'Coin',
    cardType: '',
    imgSrc: usdt,
  },
  {
    id: 4,
    title: 'TON',
    type: 'Coin',
    cardType: '',
    imgSrc: Ton,
  },
];

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('Кошелёк');
  return (
    <>
      <section className="section">
        <ul className={styles.nav}>
          <li className={`f-23 bold ${activeTab === 'Кошелёк' ? styles.active : ''}`} onClick={() => setActiveTab('Кошелёк')}>Кошелёк</li>
          <li className={`f-23 bold ${activeTab === 'Обмен' ? styles.active : ''}`} onClick={() => setActiveTab('Обмен')}>Обмен</li>
          <li className={`f-23 bold ${activeTab === 'История' ? styles.active : ''}`} onClick={() => setActiveTab('История')}>История</li>
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
    </>
  );
};

export default Exchange;
