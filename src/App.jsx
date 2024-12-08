import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './App.module.scss';
import Navigation from './shared/Navigation/Navigation';
import { menuItems } from './constants/menuItems';
import { useNavigationStore } from './state/activePageModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

function App() {
  const activePage = useNavigationStore((state) => state.activePage);

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
