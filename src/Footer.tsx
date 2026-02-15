import { ValueEditor } from "./ValueEditor";

export function Footer({
  editMode,
  tileAmount,
  colAmount,
  rowAmount,
  setTileAmount,
  setColAmount,
  setRowAmount,
  selectedTileId,
  setSelectedTileId,
  tiles,
  setTiles,
}: {
  editMode: boolean;
  tileAmount: number;
  colAmount: number;
  rowAmount: number;
  setTileAmount: (value: number) => void;
  setColAmount: (value: number) => void;
  setRowAmount: (value: number) => void;
  selectedTileId: string;
  setSelectedTileId: (value: string) => void;
  tiles: Array<{ id: string; color: string; span: number; vSpan: number }>;
  setTiles: (
    tiles: Array<{ id: string; color: string; span: number; vSpan: number }>,
  ) => void;
}) {
  const selectedTile = tiles.find((t) => t.id === selectedTileId);

  const updateTile = (updates: Partial<typeof selectedTile>) => {
    if (!selectedTile) return;
    setTiles(
      tiles.map((t) => (t.id === selectedTileId ? { ...t, ...updates } : t)),
    );
  };

  return (
    <footer
      className={`p-4 h-1/3 bg-neutral-primary-soft border-t border-default shadow-sm md:flex md:items-center md:justify-between md:p-6 transition-transform duration-300 ${
        editMode ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="h-full w-full grid gap-4 grid-cols-3 flex-wrap bg-slate-200 divide-x divide-gray-400">
        <div>
          <div>
            <ValueEditor
              value={tileAmount}
              min={1}
              max={36}
              setterFunc={setTileAmount}
            />
          </div>
          <div>
            <ValueEditor
              value={colAmount}
              min={1}
              max={8}
              setterFunc={setColAmount}
            />
          </div>
          <div>
            <ValueEditor
              value={rowAmount}
              min={1}
              max={8}
              setterFunc={setRowAmount}
            />
          </div>
        </div>
        <div>
          <TileSettings selectedTile={selectedTile} updateTile={updateTile} />
        </div>
        <div>asd</div>
      </div>
    </footer>
  );
}

function TileSettings({
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
      <ValueEditor
        value={selectedTile.span}
        min={1}
        max={6}
        setterFunc={(span: number) => updateTile({ span })}
      />
      <ValueEditor
        value={selectedTile.vSpan}
        min={1}
        max={6}
        setterFunc={(vSpan: number) => updateTile({ vSpan })}
      />
    </div>
  );
}
