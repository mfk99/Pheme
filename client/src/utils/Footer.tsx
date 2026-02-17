import { TileSettings } from "../features/tile";
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
          <div className="flex items-center gap-2 h-18">
            <svg
              className="h-10 w-10 text-gray-800"
              viewBox="0 -4 32 32"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>

            <ValueEditor
              value={tileAmount}
              min={1}
              max={36}
              setterFunc={setTileAmount}
            />
          </div>
          <div className="flex items-center gap-2 h-18">
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
              <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
              <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
            <ValueEditor
              value={colAmount}
              min={1}
              max={8}
              setterFunc={setColAmount}
            />
          </div>
          <div className="flex items-center gap-2 h-18">
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
              <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
              <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
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
