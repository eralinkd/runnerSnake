import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navigation from './shared/Navigation/Navigation';
import { menuItems } from './constants/menuItems';
import {postAddRef} from './api/userApi'
import styles from './App.module.scss';
import { useEffect } from 'react';
import { useNavigationStore } from './state/activePageModal';
import useStore from './state/store';
import { useTelegramQueryParams } from './hooks/useTelegramQueryParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

function App() {
  const setUserId = useStore((state) => state.setUserId);
  const setUserData = useStore((state) => state.setUserData);
  const activePage = useNavigationStore((state) => state.activePage);
  const getQueryParams = useTelegramQueryParams();

  useEffect(() => {
    try {
      const telegramInitData = window.Telegram.WebApp.initDataUnsafe;
      const { id, first_name, last_name, username, photo_url } = telegramInitData.user;
      setUserData({ first_name, last_name, username, photo_url });

      if (telegramInitData?.user?.id) {
        setUserId(telegramInitData.user.id);
      } else {
        console.error('Не удалось получить Telegram user.id');
      }
    }
    catch (error) {
      console.error('Error initializing Telegram Web App:', error);
    }

    const queryParams = getQueryParams();

    const refCode = queryParams?.start_param;

    if (refCode) {
      postAddRef(refCode);
    }

  }, []);

  const activeComponent = menuItems.find(
    (item) => item.id === activePage
  )?.component;
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.app}>
        <div className={styles.viewContainer}>{activeComponent}</div>
        <Navigation />
      </main>
    </QueryClientProvider>
  );
}

export default App;
