import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { minigamesTabs } from '../../constants/constants.js';
import { activeTabOnMinigames } from '../../state/ActiveTabOnMinigames.js';
import Minesweeper from './Minesweeper/Minesweeper';
import clsx from 'clsx';
import styles from './Minigames.module.scss';

const Minigames = () => {
  const activeTab = activeTabOnMinigames((state) => state.activeTab);
  const setActiveTab = activeTabOnMinigames((state) => state.setActiveTab);
  const nodeRefWallet = useRef(null);
  const nodeRefSwap = useRef(null);
  const nodeRefHistory = useRef(null);

  return (
    <>
      <div className={styles.exchange}>
        <ul className={styles.nav}>
          {minigamesTabs.map((tab, index) => (
            <li
              key={index}
              className={clsx(activeTab === tab.name && styles.active)}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
        {activeTab === 'Сапёр' && (
          <CSSTransition
            in={activeTab === 'Сапёр'}
            nodeRef={nodeRefWallet}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefWallet} className={styles.section}>
              <Minesweeper />
            </section>
          </CSSTransition>
        )}

        {activeTab === 'Сапёр 2' && (
          <CSSTransition
            in={activeTab === 'Сапёр 2'}
            nodeRef={nodeRefSwap}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefSwap} className={styles.section}>
              <Minesweeper />
            </section>
          </CSSTransition>
        )}

        {activeTab === 'Сапёр 3' && (
          <CSSTransition
            in={activeTab === 'Сапёр 3'}
            nodeRef={nodeRefHistory}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <section ref={nodeRefHistory} className={styles.section}>
              <Minesweeper />
            </section>
          </CSSTransition>
        )}
      </div>
    </>
  );
};

export default Minigames;
