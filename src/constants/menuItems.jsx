import Exchange from '../view/exchange/Exchange';
import Game from '../view/game/Game';
import Inventory from '../view/inventory/Inventory';
import Profile from '../view/profile/Profile';
import Store from '../view/store/Store';

export const menuItems = [
  {
    id: 'Биржа',
    component: <Exchange />,
  },
  {
    id: 'Магазин',
    component: <Store />,
  },
  {
    id: 'Игра',
    component: <Game />,
  },
  {
    id: 'Инвентарь',
    component: <Inventory />,
  },
  {
    id: 'Профиль',
    component: <Profile />,
  },
];
