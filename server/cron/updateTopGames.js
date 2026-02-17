import dotenv from "dotenv";
import { getGameCollection, updateGameDB } from "../mongo.js";

async function getTopGames() {
  const params = {
    filter: "topsellers",
    hidef2p: 1,
    page: 1,
    json: 1,
  };
  const query = new URLSearchParams(params).toString();
  const url = `https://store.steampowered.com/search/results/?${query}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function parseSteamTopGames(data) {
  const gameArr = [];
  for (const game of data.items) {
    const gameTitle = game.name;
    const gameId = game.logo.split("/")[6];
    gameArr.push({ gameTitle: gameTitle, gameId: gameId });
  }
  return gameArr;
}

function removeExistingGames(gameCollection, retrievedGames) {
  const diff = [];
  const gameCollectionIds = gameCollection.map((game) => game.gameId);
  for (const game of retrievedGames) {
    if (!gameCollectionIds.includes(game.gameId)) {
      diff.push(game);
    }
  }
  return diff;
}

async function main() {
  dotenv.config();
  const data = await getTopGames();
  const parsedData = parseSteamTopGames(data);
  const gameCollection = await getGameCollection();
  const diff = removeExistingGames(gameCollection, parsedData);
  await updateGameDB(diff);
  process.exit(0);
}

main();
