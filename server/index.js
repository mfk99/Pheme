import express from "express";
import { getGameCollection, getGamePlayerStatistics } from "./mongo.js";

import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/steam_games/", async (req, res) => {
  const gameCollection = await getGameCollection();
  res.send(gameCollection);
});

app.get("/steam_player_stats/:appId", async (req, res) => {
  const { appId } = req.params;

  try {
    const gameStats = await getGamePlayerStatistics(appId);
    res.send(gameStats);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch game stats" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
