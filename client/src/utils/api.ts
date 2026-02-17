/// <reference types="vite/client" />
import { GameStats } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGameStats = async (
  appId: string,
): Promise<Array<GameStats>> => {
  const response = await fetch(`${API_URL}/steam_player_stats/${appId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch game stats");
  }
  return response.json();
};
