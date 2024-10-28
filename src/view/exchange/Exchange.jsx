import CurrencyCard from '../../shared/currencyCard/CurrencyCard';
import Bitcoin from '../../assets/bitcoin.png';
import Ton from '../../assets/ton.png';
import usdt from '../../assets/usdt.png';
import Scoin from '../../assets/scoin.png';
import styles from './Exchange.module.scss';
import ReplenishModal from '../../shared/ReplenishModal/ReplenishModal';

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
  return (
    <>
      <main className={styles.main}>
        <section className="section">
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
        </section>
      </main>
      <ReplenishModal />
    </>
  );
};

export default Exchange;
