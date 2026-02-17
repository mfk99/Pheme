import { MongoClient } from "mongodb";

export async function getGameCollection() {
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

export async function updateGamePlayerData(playerCountData) {
  const mongoDBUsername = process.env.MONGO_CI_USERNAME;
  const mongoDBPassword = process.env.MONGO_CI_PASSWORD;
  const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.wgv2yjv.mongodb.net/`;
  const client = new MongoClient(uri);

  try {
    const steamDatabase = client.db("steam_usage_data");
    const gameCollection = steamDatabase.collection("Pheme-data");
    await gameCollection.insertOne(playerCountData);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export async function updateGameDB(data) {
  if (data.length == 0) return;
  const mongoDBUsername = process.env.MONGO_CI_USERNAME;
  const mongoDBPassword = process.env.MONGO_CI_PASSWORD;
  const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.wgv2yjv.mongodb.net/`;
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

async function getPlayerStatistics() {
  const mongoDBUsername = process.env.MONGO_CI_USERNAME;
  const mongoDBPassword = process.env.MONGO_CI_PASSWORD;
  const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.wgv2yjv.mongodb.net/`;
  const client = new MongoClient(uri);

  let data = [];
  try {
    const steamDatabase = client.db("steam_usage_data");
    const dataCollection = steamDatabase.collection("Pheme-data");
    data = await dataCollection.find({}).toArray();
  } finally {
    await client.close();
  }
  return data;
}

export async function getGamePlayerStatistics(appId) {
  const playerData = await getPlayerStatistics();
  const gameStatistics = [];
  for (const dataEntry of playerData) {
    const timeStamp = dataEntry.timeStamp;
    const stats = dataEntry.data.find((o) => o.appId == appId);
    if (stats) {
      gameStatistics.push({
        timeStamp: timeStamp,
        ...stats,
      });
    }
  }
  return gameStatistics;
}
