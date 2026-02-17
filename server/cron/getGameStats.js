import dotenv from "dotenv";
import { getGameCollection, updateGamePlayerData } from "../mongo.js";

async function getGamePlayerCount(gameCollection) {
  const playerCounts = [];
  for (const game of gameCollection) {
    const appId = game.gameId;
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.response.player_count)
      playerCounts.push({
        appId: appId,
        playerCount: data.response.player_count,
      });
  }
  return playerCounts;
}

function timestampData(playerCountData) {
  const timeStamp = new Date();
  const timestampedData = { timeStamp: timeStamp, data: playerCountData };
  return timestampedData;
}

async function main() {
  dotenv.config();
  const gameCollection = await getGameCollection();
  const playerCountData = await getGamePlayerCount(gameCollection);
  const timestampedData = timestampData(playerCountData);
  await updateGamePlayerData(timestampedData);
  process.exit(0);
}

main();
