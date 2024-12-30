import api from './config';

export const postCreateGame = async () => {
  const response = await api.post(`/game/snake/create/`);
  return response.data;
};

export const postCreateMinerGame = async (data) => {
  const response = await api.post(`/game/bomb/create/`, data);
  return response.data;
}

export const postGameStatus = async (gameID, content) => {
  console.log(gameID);
  const response = await api.post(
    `/game/game/currentContent/${gameID}`,
    {content},
    {
      noUID: true,
    }
  );
  return response.data;
};
