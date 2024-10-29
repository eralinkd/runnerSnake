import Exchange from './view/exchange/Exchange';
import Game from './view/game/Game';
import Inventory from './view/inventory/Inventory';
import Profile from './view/profile/Profile';
import Store from './view/store/Store';
import bImg from './assets/navIcons/b.svg'
import gImg from './assets/navIcons/g.svg'
import iImg from './assets/navIcons/i.svg'
import pImg from './assets/navIcons/p.svg'
import sImg from './assets/navIcons/s.svg'
import styles from './App.module.scss';
import { useState } from 'react';

const menuComponents = {
  'Биржа': <Exchange />,
  'Магазин': <Store />,
  'Игра': <Game />,
  'Инвентарь': <Inventory />,
  'Профиль': <Profile />
};

const menuIcons = {
  'Биржа': bImg,
  'Магазин': sImg,
  'Игра': gImg,
  'Инвентарь': iImg,
  'Профиль': pImg
};

function App() {
  const [activeComponent, setActiveComponent] = useState('Биржа');

  return (
    <main className={styles.app}>
      <div className={styles.viewContainer}>
        {menuComponents[activeComponent]}
      </div>

      <ul className={styles.nav}>
        {Object.keys(menuComponents).map((menuItem) => (
          <li
            key={menuItem}
            className={`'f-12' ${menuItem === activeComponent ? ' ' + styles.active : ''}`}
            onClick={() => setActiveComponent(menuItem)}
          >
            <img
              src={menuIcons[menuItem]}
              alt={`${menuItem} icon`}
            />
            {menuItem}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;