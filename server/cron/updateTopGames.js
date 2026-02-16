import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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

async function getGameCollection() {
  const uri = process.env.MONGO_CONNECTION_STRING;
  const client = new MongoClient(uri);

  let games = [];
  try {
    const steamDatabase = client.db("steam_usage_data");
    const gameCollection = steamDatabase.collection("games");
    games = await gameCollection.find({}).toArray();
  } finally {
    await client.close();
  }
  return games;
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

async function updateGameDB(data) {
  if (data.length == 0) return;
  const uri = process.env.MONGO_CONNECTION_STRING;
  const client = new MongoClient(uri);

  try {
    const steamDatabase = client.db("steam_usage_data");
    const gameCollection = steamDatabase.collection("games");
    await gameCollection.insertMany(data);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function main() {
  dotenv.config();
  const data = await getTopGames();
  const parsedData = parseSteamTopGames(data);
  const gameCollection = await getGameCollection();
  const diff = removeExistingGames(gameCollection, parsedData);
  console.log("diff:", diff);
  await updateGameDB(diff);
  process.exit(0);
}

main();
