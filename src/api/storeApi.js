import api from './config';

export const buyProduct = async (data) => {
	const response = await api.post(`/shop/buy`, data, { noUID: true });
	return response.data;
}