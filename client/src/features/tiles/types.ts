export type BaseTile = {
  id: string;
  color: string;
  span: number;
  vSpan: number;
};

export type BlankTile = BaseTile & {
  type: "blank";
};

export type SteamPlayersTile = BaseTile & {
  type: "steam_players";
  appId: string;
};

export type Tile = BlankTile | SteamPlayersTile;
export type TileType = "blank" | "steam_players";
