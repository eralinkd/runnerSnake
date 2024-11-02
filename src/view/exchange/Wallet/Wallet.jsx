import Bitcoin from '../../../assets/bitcoin.png';
import CurrencyCard from './CurrencyCard/CurrencyCard';
import Scoin from '../../../assets/scoin.png';
import Ton from '../../../assets/ton.png';
import usdt from '../../../assets/usdt.png';
import styles from './Wallet.module.scss';
import ReplenishModal from './ReplenishModal/ReplenishModal';
import WithdrawModal from './WithdrawModal/WithdrawModal';

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

const Wallet = () => {
  return (
    <>
      <section className="section">
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
      </section>
      <ReplenishModal />
      <WithdrawModal />
    </>
  );
};

export default Wallet;
