import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { activeTabs } from '../../constants/constants.js';
import { activeTabOnExchange } from '../../state/ActiveTabOnExchange.js';
import History from './History/History';
import Swap from './Swap/Swap';
import Wallet from './Wallet/Wallet';
import clsx from 'clsx';
import styles from './Exchange.module.scss';

const Exchange = () => {
  const activeTab = activeTabOnExchange((state) => state.activeTab);
  const setActiveTab = activeTabOnExchange((state) => state.setActiveTab);
  const nodeRefWallet = useRef(null);
  const nodeRefSwap = useRef(null);
  const nodeRefHistory = useRef(null);

  return (
    <>
      <div className={styles.exchange}>
        <ul className={styles.nav}>
          {activeTabs.map((tab, index) => (
            <li
              key={index}
              className={clsx(activeTab === tab.name && styles.active)}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
        {activeTab === 'Кошелёк' && (
          <CSSTransition
            in={activeTab === 'Кошелёк'}
            nodeRef={nodeRefWallet}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefWallet} className={styles.section}>
              <Wallet />
            </section>
          </CSSTransition>
        )}

        {activeTab === 'Обмен' && (
          <CSSTransition
            in={activeTab === 'Обмен'}
            nodeRef={nodeRefSwap}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefSwap} className={styles.section}>
              <Swap />
            </section>
          </CSSTransition>
        )}

        {activeTab === 'История' && (
          <CSSTransition
            in={activeTab === 'История'}
            nodeRef={nodeRefHistory}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefHistory} className={styles.section}>
              <History />
            </section>
          </CSSTransition>
        )}
      </div>
    </>
  );
};

export default Exchange;
