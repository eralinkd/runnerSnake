import History from './History/History';
import Swap from './Swap/Swap';
import Wallet from './Wallet/Wallet';
import clsx from 'clsx';
import styles from './Exchange.module.scss';
import { useState } from 'react';

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
        {activeTab === 'Кошелёк' && <Wallet />}
        {activeTab === 'Обмен' && <Swap />}
        {activeTab === 'История' && <History />}
      </section>
    </>
  );
};

export default Exchange;
