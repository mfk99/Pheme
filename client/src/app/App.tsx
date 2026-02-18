import { useState, useEffect } from "react";
import "./App.css";
import { Footer } from "../utils/Footer";
import { Tiles } from "../features/tiles/Tile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlankTile, Tile } from "../features/tiles/types";

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

const createBlankTile = (id: string): BlankTile => ({
  id,
  color: "#ffffff",
  span: 1,
  vSpan: 1,
  type: "blank",
});

export function App() {
  const queryClient = new QueryClient();
  const [editMode, setEditMode] = useState(false);
  const [tileAmount, setTileAmount] = useState(10);
  const [colAmount, setColAmount] = useState(6);
  const [rowAmount, setRowAmount] = useState(6);
  const [selectedTileId, setSelectedTileId] = useState("0");
  const [tiles, setTiles] = useState<Tile[]>(
    Array.from({ length: tileAmount }, (_, i) => createBlankTile(i.toString())),
  );

  useEffect(() => {
    setTiles((prevTiles) => {
      if (tileAmount > prevTiles.length) {
        // Add new tiles
        const newTiles = Array.from(
          { length: tileAmount - prevTiles.length },
          (_, i) => createBlankTile((prevTiles.length + i).toString()),
        );
        return [...prevTiles, ...newTiles];
      } else {
        // Remove extra tiles
        return prevTiles.slice(0, tileAmount);
      }
    });
  }, [tileAmount]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
        <Header editMode={editMode} setEditMode={setEditMode} />
        <div className="p-8 flex gap-4 flex-wrap flex-1">
          <Tiles
            editMode={editMode}
            tileAmount={tileAmount}
            colAmount={colAmount}
            rowAmount={rowAmount}
            tiles={tiles}
            setTiles={setTiles}
            selectedTileId={selectedTileId}
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
          tiles={tiles}
          setTiles={setTiles}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
