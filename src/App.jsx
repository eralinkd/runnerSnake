import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './shared/Navigation/Navigation';
import Exchange from './view/exchange/Exchange';
import Store from './view/store/Store';
import Game from './view/game/Game';
import Minigames from './view/minigames/Minigames';
import Inventory from './view/inventory/Inventory';
import Profile from './view/profile/Profile';
import styles from './App.module.scss';
import { useEffect } from 'react';
import useStore from './state/Store';
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
  const getQueryParams = useTelegramQueryParams();

  useEffect(() => {
    try {
      const telegramInitData = window.Telegram.WebApp.initDataUnsafe;
      const { first_name, last_name, username, photo_url } =
        telegramInitData.user;
      setUserData({ first_name, last_name, username, photo_url });

      if (telegramInitData?.user?.id) {
        setUserId(telegramInitData.user.id);
      }
    } catch (error) {
      console.error('Error initializing Telegram Web App:', error);
    }

    const queryParams = getQueryParams();
    const refCode = queryParams?.start_param;

    if (refCode) {
      postAddRef(refCode);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <main className={styles.app}>
          <div className={styles.viewContainer}>
            <Routes>
              <Route path="/" element={<Navigate to={`/game`} replace />} />
              <Route path={`/exchange`} element={<Exchange />} />
              <Route path={`/store`} element={<Store />} />
              <Route path={`/game`} element={<Game />} />
              <Route path={`/minigames`} element={<Minigames />} />
              <Route path={`/inventory`} element={<Inventory />} />
              <Route path={`/profile`} element={<Profile />} />
            </Routes>
          </div>
          <Navigation />
        </main>
    </QueryClientProvider>
  );
}

export default App;
