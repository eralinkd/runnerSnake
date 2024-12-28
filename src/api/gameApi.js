import api from './config';

export const postCreateGame = async () => {
  const response = await api.post(`/game/snake/create/`);
  return response.data;
};

export const postGameStatus = async (gameID) => {
  console.log(gameID);
  const response = await api.post(
    `/game/game/currentContent/${gameID}`,
    {},
    {
      noUID: true,
    }
  );
  return response.data;
};
