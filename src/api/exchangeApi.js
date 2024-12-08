import api from './config';

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
	return response.data;
};

export const getHistory = async (filter) => {
	const tmpData = {
		filter
	}
	const { data } = await api.get(`/users/history/1`, tmpData);
	return data;
};