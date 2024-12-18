import { menuItems } from '../../constants/menuItems';
import { useNavigationStore } from '../../state/ActivePageModal';
import styles from './Navigation.module.scss';
import clsx from 'clsx';

const Navigation = () => {
  const activePage = useNavigationStore((state) => state.activePage);
  const setActivePage = useNavigationStore((state) => state.setActivePage);

  return (
    <ul className={styles.nav}>
      {menuItems.map((menuItem) => (
        <li
          key={menuItem.id}
          className={clsx(menuItem.id === activePage && styles.active)}
          onClick={() => setActivePage(menuItem.id)}
        >
          {menuItem.id === 'Биржа' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <linearGradient id="hover-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF24B0" />
                <stop offset="100%" stopColor="#7000AE" />
              </linearGradient>
              <path
                d="M1 1V22H4.9375M22 22H20.6875M20.6875 22V4.9375M20.6875 22H15.4375M15.4375 22V11.5M15.4375 22H10.1875M10.1875 22V8.875M10.1875 22H4.9375M4.9375 22V14.125"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {menuItem.id === 'Магазин' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
            >
              <linearGradient id="hover-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF24B0" />
                <stop offset="100%" stopColor="#7000AE" />
              </linearGradient>
              <path
                d="M1 1H5L5.67 4.3475L6.34 7.695L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6.00075M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {menuItem.id === 'Игра' && (
            <svg
              className={styles.gameIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
            >
              <linearGradient id="hover-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF24B0" />
                <stop offset="100%" stopColor="#7000AE" />
              </linearGradient>
              <path
                d="M3.9315 1.54289L16.6373 8.23016C18.062 8.97999 18.062 11.02 16.6373 11.7698L3.93149 18.4571C2.59967 19.1581 1 18.1923 1 16.6873V3.31273C1 1.80771 2.59968 0.841934 3.9315 1.54289Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {menuItem.id === 'Инвентарь' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <linearGradient id="hover-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF24B0" />
                <stop offset="100%" stopColor="#7000AE" />
              </linearGradient>
              <path
                d="M2.3125 8V8C1.58763 8 1 7.41237 1 6.6875V3C1 1.89543 1.89543 1 3 1H20C21.1046 1 22 1.89543 22 3V6.6875C22 7.41237 21.4124 8 20.6875 8V8M2.3125 8V20C2.3125 21.1046 3.20793 22 4.3125 22H18.6875C19.7921 22 20.6875 21.1046 20.6875 20V8M2.3125 8H20.6875M8.875 12.2H14.125"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {menuItem.id === 'Профиль' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
            >
              <linearGradient id="hover-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF24B0" />
                <stop offset="100%" stopColor="#7000AE" />
              </linearGradient>
              <path
                d="M19.6667 21.5V19.1667C19.6667 17.929 19.175 16.742 18.2998 15.8668C17.4247 14.9917 16.2377 14.5 15 14.5H5.66667C4.42899 14.5 3.242 14.9917 2.36683 15.8668C1.49167 16.742 1 17.929 1 19.1667V21.5M15 5.16667C15 7.744 12.9107 9.83333 10.3333 9.83333C7.756 9.83333 5.66667 7.744 5.66667 5.16667C5.66667 2.58934 7.756 0.5 10.3333 0.5C12.9107 0.5 15 2.58934 15 5.16667Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
