import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetchCryptos = async () => {
	try {
		const response = await api.get('/payment/cryptos');
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptos:', error);
		throw error;
	}
};

export default api;