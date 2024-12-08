import axios from 'axios';
import { useStore } from 'zustand';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const { userId } = useStore.getState()

        if (userId) {
            const separator = config.url.includes('?') ? '&' : '?'
            config.url = `${config.url}${separator}userId=${userId}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const setupAxiosInterceptors = (toastrRef) => {
	api.interceptors.response.use(
		(response) => response,
		(error) => {
			alert(`API call failed. Error: ${error}`);
			// if (toastrRef && toastrRef.current) {
			// 	toastrRef.current.notify("Something went wrong", "error");
			// } else {
			// 	console.log("toastrRef BROKEN!!!!!!", toastrRef);
			// }
			return new Promise(() => { });
		}
	);
};

export const fetchCryptos = async () => {
	const { data } = await api.get('/payment/cryptos')

	return data
};

export const withdrawBalance = async (data) => {
	const response = await api.post(`/users/withdrawBalance/1`, data);
	return response.data;
}

export const replenishBalance = async (data) => {
	const response = await api.post(`/users/replenishBalance/1`, data);
	return response.data;
}

export const validatePaymentAddress = async (data) => {
	const response = await api.post(`/payment/validate`, data);
	return response.data; // Предполагается, что объект содержит поле `result`
};

export const getHistory = async (userId, filter) => {
	const tmpData = {
		filter
	}

	const { data } = await api.get(`/users/history/1`, tmpData);

	return data;
};

export default api;