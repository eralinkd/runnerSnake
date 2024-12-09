import Bitcoin from '../assets/exchange/currency/bitcoin.png';
import SCoin from '../assets/exchange/currency/scoin.png';
import Ton from '../assets/exchange/currency/ton.png';
import Usdt from '../assets/exchange/currency/usdt.png';

export const currencyImages = {
	BTC: Bitcoin,
	SCOIN: SCoin,
	TON: Ton,
	USDT: Usdt,
	default: SCoin,
};

export const historySort = [
	{ value: 'NONE', label: 'Сортировать' },
	{ value: 'DATE', label: 'По дате' },
	{ value: 'REPLENISHMENT', label: 'Пополнение' },
	{ value: 'WITHDRAW', label: 'Вывод' },
	{ value: 'SWAP', label: 'Oбмен' },
];

export const activeTabs = [
	{ name: 'Кошелёк' },
	{ name: 'Обмен' },
	{ name: 'История' },
];