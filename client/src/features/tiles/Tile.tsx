import { Spinner } from "../../utils/Spinner";
import { ValueEditor } from "../../utils/ValueEditor";
import { useQuery } from "@tanstack/react-query";
import { fetchGameStats } from "../../utils/api";
import { GameStats } from "../../utils/types";
import { LineChart } from "@mui/x-charts";
import { Tile, TileType } from "./types";

type TilesProps = {
  editMode: boolean;
  tileAmount: number;
  colAmount: number;
  rowAmount: number;
  tiles: Tile[];
  setTiles: (tiles: Tile[]) => void;
  selectedTileId: string;
  setSelectedTileId: (value: string) => void;
};

export function Tiles({
  editMode,
  tileAmount,
  colAmount,
  rowAmount,
  tiles,
  setTiles,
  selectedTileId,
  setSelectedTileId,
}: TilesProps) {
  return (
    <div className="p-8 flex gap-4 flex-wrap flex-1 overflow-auto">
      <div
        className="grid gap-4 flex-wrap"
        style={{
          gridTemplateColumns: `repeat(${colAmount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rowAmount}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile) => (
          <TileObject
            tile={tile}
            key={tile.id}
            editMode={editMode}
            selectedTileId={selectedTileId}
            setSelectedTileId={setSelectedTileId}
          />
        ))}
      </div>
    </div>
  );
}

function TileObject({
  tile,
  editMode,
  selectedTileId,
  setSelectedTileId,
}: {
  tile: Tile;
  editMode: boolean;
  selectedTileId: string;
  setSelectedTileId: (value: string) => void;
}) {
  const scale = 100;
  const { id, color, span, vSpan } = tile;
  const isSelected = selectedTileId === id;
  if (editMode)
    return (
      <div
        style={{
          backgroundColor: color,
          width: scale * span + 16 * (span - 1),
          height: scale * vSpan + 16 * (vSpan - 1),
          gridColumn: `span ${span}`,
          gridRow: `span ${vSpan}`,
        }}
        className={`border-2 rounded-lg transition-all flex items-center justify-center 
         ${
           isSelected
             ? "border-blue-500 ring-4 ring-blue-300 shadow-xl scale-105"
             : "border-amber-950 border-dashed rounded-lg transition-colors"
         }`}
      >
        <button
          onClick={(e) => {
            setSelectedTileId(id);
          }}
        >
          Edit
        </button>
      </div>
    );
  return (
    <div
      style={{
        backgroundColor: color,
        width: scale * span + 16 * (span - 1),
        height: scale * vSpan + 16 * (vSpan - 1),
        gridColumn: `span ${span}`,
        gridRow: `span ${vSpan}`,
      }}
      className="border-2 border-amber-950 rounded-lg transition-all flex items-center justify-center"
    >
      {tile.type === "steam_players" && (
        <GameStatsComponent appId={tile.appId} />
      )}
    </div>
  );
}

export function TileSettings({
  selectedTile,
  updateTile,
}: {
  selectedTile:
    | { id: string; color: string; span: number; vSpan: number; type: string }
    | undefined;
  updateTile: (
    updates: Partial<{
      id: string;
      color: string;
      span: number;
      vSpan: number;
    }>,
  ) => void;
}) {
  if (!selectedTile) return <div>No tile selected!</div>;

  return (
    <div className="relative mt-6 flex-1 px-4 sm:px-6">
      <input
        type="color"
        value={selectedTile.color}
        onChange={(e) => updateTile({ color: e.target.value })}
        className="w-12 h-12 cursor-pointer rounded"
      />
      <div className="flex items-center">
        <svg
          className="h-10 w-10 text-gray-800"
          viewBox="0 -4 32 32"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="7 8 3 12 7 16" />{" "}
          <polyline points="17 8 21 12 17 16" />{" "}
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
        <ValueEditor
          value={selectedTile.span}
          min={1}
          max={6}
          setterFunc={(span: number) => updateTile({ span })}
        />
      </div>
      <div className="flex items-center">
        <svg
          className="h-10 w-10 text-gray-800"
          viewBox="0 -4 32 32"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="8 7 12 3 16 7" />{" "}
          <polyline points="8 17 12 21 16 17" />{" "}
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
        <ValueEditor
          value={selectedTile.vSpan}
          min={1}
          max={6}
          setterFunc={(vSpan: number) => updateTile({ vSpan })}
        />
      </div>
    </div>
  );
}

export function TileTypeSettings({
  selectedTile,
  updateTile,
}: {
  selectedTile: Tile | undefined;
  updateTile: (updates: Partial<Tile>) => void;
}) {
  if (!selectedTile) return <div>No tile selected!</div>;

  return (
    <div className="relative mt-6 flex-1 px-4 sm:px-6">
      <select
        name="tileType"
        id="tileType"
        onChange={(e) => updateTile({ type: e.target.value as TileType })}
        value={selectedTile.type}
      >
        <option value="blank">Blank</option>
        <option value="steam_players">Steam player history</option>
      </select>
      {selectedTile.type === "steam_players" && (
        <div className="flex items-center">
          <span>appId:</span>
          <input
            type="text"
            onChange={(e) => updateTile({ appId: e.target.value })}
            value={selectedTile.appId}
          ></input>
        </div>
      )}
    </div>
  );
}

interface Props {
  appId: string;
}

export const GameStatsComponent = ({ appId }: Props) => {
  const { data, isLoading, isError, error } = useQuery<Array<GameStats>>({
    queryKey: ["gameStats", appId],
    queryFn: () => fetchGameStats(appId),
    enabled: !!appId,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (data) return <GameStatsChart playerData={data} />;
};

export function GameStatsChart({
  playerData,
}: {
  playerData: Array<GameStats>;
}) {
  return (
    <LineChart
      yAxis={[{ min: 0 }]}
      series={[
        {
          data: playerData.map((d) => d.playerCount),
          label: "Player count",
          showMark: false,
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: playerData.map((d) => d.timeStamp),
          tickLabelStyle: { display: "none" },
        },
      ]}
    />
  );
}
