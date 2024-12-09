import { useEffect } from 'react';

export function useTelegramQueryParams() {
  const getQueryParams = () => {
    const initData = window.Telegram.WebApp.initData;

    if (!initData) {
      console.error('Telegram WebApp initData is not available');
      return {};
    }

    const params = new URLSearchParams(initData);

    const queryParams = {};
    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    return queryParams;
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    console.log('Query Params:', queryParams);
  }, []);

  return getQueryParams;
}
