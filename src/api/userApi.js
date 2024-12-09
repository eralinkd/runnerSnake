import api from "./config";

export const postWithdrawBalance = async () => { 
	const { data } = await api.get(`/users/withdrawBalance/`) 
	return data;
};

export const postTap = async () => { 
    const { data } = await api.get(`/users/tap/`) 
    return data;
};

export const postSwap = async (params) => { 
    const { data } = await api.post(`/users/swap/`, {params: params}) 
    return data;
};

export const postReplenishBalance = async () => { 
    const { data } = await api.get(`/users/replenishBalance/`) 
    return data;
};

export const postAddRef = async () => { 
    const { data } = await api.get(`/users/addRef/${refUserId}/`) 
    return data;
};

export const getUser = async () => { 
    const { data } = await api.get(`/users/`) 
    return data;
};

export const getHistory = async () => { 
    const { data } = await api.get(`/users/history/`) 
    return data;
};

export const getBalance = async () => { 
    const { data } = await api.get(`/users/balance/`) 
    return data;
};