import BoardMap from "../model/BoardMap.ts";

const lobbies = new Map();

const newLobby = (username: string) => {
  const map = new BoardMap();

  lobbies.set(username, map);
};

const getMapState = (username: string) => {
  return lobbies.get(username);
};
