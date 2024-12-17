import api from './config';

export const buyProduct = async (data) => {
	const response = await api.post(`/shop/buy`, data, { noUID: true });
	return response.data;
}

export const fetchProducts = async () => {
	const { data } = await api.get('/shop/products/')
	return data
}