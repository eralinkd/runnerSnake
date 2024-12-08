import axios from 'axios';
import useStore from '../state/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const { userId } = useStore.getState();
    if (userId) {
      const separator = config.url.includes('?') ? '&' : '?';
      config.url = `${config.url}${separator}userId=${userId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupAxiosInterceptors = (toastrRef) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      alert(`API вызов завершился с ошибкой: ${error}`);
      
      // if (toastrRef && toastrRef.current) {
      //   toastrRef.current.notify("Что-то пошло не так", "error");
      // } else {
      //   console.log("toastrRef не доступен:", toastrRef);
      // }

      return Promise.reject(error);
    }
  );
};

export default api;
