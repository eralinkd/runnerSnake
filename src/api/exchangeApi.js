import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetchCryptos = async () => {
	// try {
	// 	const response = await api.get('/payment/cryptos');
	// 	return response.data;
	// } catch (error) {
	// 	console.error('Error fetching cryptos:', error);
	// 	throw error;
	// }
	const { data } = await api.get('/payment/cryptos')

	return data
};

export const withdrawBalance = async (data) => {
	console.log('data', data);
	const response = await api.post(`/users/withdrawBalance/1`, data);
	return response.data;
}

export default api;