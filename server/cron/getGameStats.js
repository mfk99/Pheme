import { MongoClient } from "mongodb";
import dotenv from "dotenv";

async function getGameCollection() {
  const mongoDBUsername = process.env.MONGO_CI_USERNAME;
  const mongoDBPassword = process.env.MONGO_CI_PASSWORD;
  const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.wgv2yjv.mongodb.net/`;
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

async function updateGamePlayerData(playerCountData) {
  const timeStamp = new Date();
  const timeStampedPlayerCountData = playerCountData.map((x) => ({
    ...x,
    timeStamp: timeStamp,
  }));
  const mongoDBUsername = process.env.MONGO_CI_USERNAME;
  const mongoDBPassword = process.env.MONGO_CI_PASSWORD;
  const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.wgv2yjv.mongodb.net/`;
  const client = new MongoClient(uri);

  try {
    const steamDatabase = client.db("steam_usage_data");
    const gameCollection = steamDatabase.collection("Pheme-data");
    await gameCollection.insertMany(timeStampedPlayerCountData);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function main() {
  dotenv.config();
  const gameCollection = await getGameCollection();
  const playerCountData = await getGamePlayerCount(gameCollection);
  await updateGamePlayerData(playerCountData);
  process.exit(0);
}

main();
