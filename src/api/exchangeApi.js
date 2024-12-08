import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

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

export const getHistory = async () => {
	const { data } = await api.post('/users/history/1')

	return data
}

export default api;