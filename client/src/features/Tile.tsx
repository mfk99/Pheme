import { ValueEditor } from "../utils/ValueEditor";

function ColorTile({
  id,
  editMode,
  color,
  span,
  vSpan,
  setSelectedTileId,
}: {
  id: string;
  editMode: boolean;
  color: string;
  span: number;
  vSpan: number;
  setSelectedTileId: (value: string) => void;
}) {
  const scale = 100;
  const tileId = id;
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
        className="border-2 border-amber-950 border-dashed rounded-lg transition-colors flex items-center justify-center"
      >
        <button
          onClick={(e) => {
            console.log(tileId);
            setSelectedTileId(tileId);
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
      className="border-2 border-amber-950 rounded-lg transition-colors flex items-center justify-center"
    ></div>
  );
}

export function ColorTiles({
  editMode,
  tileAmount,
  colAmount,
  rowAmount,
  tiles,
  setTiles,
  setSelectedTileId,
}: {
  editMode: boolean;
  tileAmount: number;
  colAmount: number;
  rowAmount: number;
  tiles: Array<{ id: string; color: string; span: number; vSpan: number }>;
  setTiles: (
    tiles: Array<{ id: string; color: string; span: number; vSpan: number }>,
  ) => void;
  setSelectedTileId: (value: string) => void;
}) {
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
          <ColorTile
            key={tile.id}
            id={tile.id}
            editMode={editMode}
            color={tile.color}
            span={tile.span}
            vSpan={tile.vSpan}
            setSelectedTileId={setSelectedTileId}
          />
        ))}
      </div>
    </div>
  );
}

export function TileSettings({
  selectedTile,
  updateTile,
}: {
  selectedTile:
    | { id: string; color: string; span: number; vSpan: number }
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
