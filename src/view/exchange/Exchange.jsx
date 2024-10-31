import { useState } from 'react';
import clsx from 'clsx';
import styles from './Exchange.module.scss';
import Wallet from './Wallet/Wallet';
import History from './History/History';

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
        {activeTab === 'Обмен' && (
          <div className={styles.nothing}>Still nothing here</div>
        )}
        {activeTab === 'История' && <History />}
      </section>
    </>
  );
};

export default Exchange;
