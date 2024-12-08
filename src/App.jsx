import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Exchange from './view/exchange/Exchange';
import Game from './view/game/Game';
import Inventory from './view/inventory/Inventory';
import Profile from './view/profile/Profile';
import Store from './view/store/Store';
import bImg from './assets/navIcons/b.svg';
import clsx from 'clsx';
import gImg from './assets/navIcons/g.svg';
import iImg from './assets/navIcons/i.svg';
import pImg from './assets/navIcons/p.svg';
import sImg from './assets/navIcons/s.svg';
import styles from './App.module.scss';
import useStore from './state/store';

const menuComponents = {
  Биржа: <Exchange />,
  Магазин: <Store />,
  Игра: <Game />,
  Инвентарь: <Inventory />,
  Профиль: <Profile />,
};

const menuIcons = {
  Биржа: bImg,
  Магазин: sImg,
  Игра: gImg,
  Инвентарь: iImg,
  Профиль: pImg,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

function App() {
  const setUserId = useStore((state) => state.setUserId);
  const [activeComponent, setActiveComponent] = useState('Биржа');

  useEffect(() => {
    const telegramInitData = window.Telegram.WebApp.initDataUnsafe;

    if (telegramInitData?.user?.id) {
      setUserId(telegramInitData.user.id);
      console.log('Telegram user.id:', telegramInitData.user.id);
    } else {
      console.error('Не удалось получить Telegram user.id');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.app}>
        <div className={styles.viewContainer}>
          {menuComponents[activeComponent]}
        </div>

        <ul className={styles.nav}>
          {Object.keys(menuComponents).map((menuItem) => (
            <li
              key={menuItem}
              className={clsx(
                'f-12',
                menuItem === activeComponent && styles.active
              )}
              onClick={() => setActiveComponent(menuItem)}
            >
              <img src={menuIcons[menuItem]} alt={`${menuItem} icon`} />
              {menuItem}
            </li>
          ))}
        </ul>
      </main>
    </QueryClientProvider>
  );
}

export default App;
