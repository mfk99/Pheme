import {
  ElDialog,
  ElDialogBackdrop,
  ElDialogPanel,
} from "@tailwindplus/elements/react";
import { useState } from "react";
import "./App.css";
import { ValueEditor } from "./ValueEditor";
import { Footer } from "./Footer";

function Header({
  editMode,
  setEditMode,
}: {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}) {
  return (
    <header className="bg-gray-800">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div>
          <EditButton editMode={editMode} setEditMode={setEditMode} />
        </div>
      </nav>
    </header>
  );
}

function EditButton({
  editMode,
  setEditMode,
}: {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}) {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
      onClick={() => setEditMode(!editMode)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </button>
  );
}

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

function ColorTiles({
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

export function App() {
  const [editMode, setEditMode] = useState(false);
  const [tileAmount, setTileAmount] = useState(10);
  const [colAmount, setColAmount] = useState(6);
  const [rowAmount, setRowAmount] = useState(6);
  const [selectedTileId, setSelectedTileId] = useState("0");
  const [tiles, setTiles] = useState(
    Array.from({ length: tileAmount }, (_, i) => ({
      id: i.toString(),
      color: "#ffffff",
      span: 1,
      vSpan: 1,
    })),
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header editMode={editMode} setEditMode={setEditMode} />
      <div className="p-8 flex gap-4 flex-wrap flex-1">
        <ColorTiles
          editMode={editMode}
          tileAmount={tileAmount}
          colAmount={colAmount}
          rowAmount={rowAmount}
          tiles={tiles}
          setTiles={setTiles}
          setSelectedTileId={setSelectedTileId}
        />
      </div>
      <Footer
        editMode={editMode}
        tileAmount={tileAmount}
        colAmount={colAmount}
        rowAmount={rowAmount}
        setTileAmount={setTileAmount}
        setColAmount={setColAmount}
        setRowAmount={setRowAmount}
        selectedTileId={selectedTileId}
        setSelectedTileId={setSelectedTileId}
        tiles={tiles}
        setTiles={setTiles}
      />
    </div>
  );
}

export default App;
