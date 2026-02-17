import express from "express";
import cors from "cors";
import { getGameCollection, getGamePlayerStatistics } from "./mongo.js";

import dotenv from "dotenv";
const app = express();
const allowedOrigins =
  process.env.NODE_ENV == "production"
    ? ["https://pheme-five.vercel.app"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }

      return callback(null, true);
    },
    credentials: true,
  }),
);

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
  console.log(`App listening on port ${port}`);
});
