import {
  ElDialog,
  ElDialogBackdrop,
  ElDialogPanel,
} from "@tailwindplus/elements/react";
import { useState } from "react";
import "./App.css";
import { ValueEditor } from "./ValueEditor";

function Header({
  editMode,
  setEditMode,
  tileAmount,
  setTileAmount,
  colAmount,
  setColAmount,
  rowAmount,
  setRowAmount,
}: {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  tileAmount: number;
  setTileAmount: (value: number) => void;
  colAmount: number;
  setColAmount: (value: number) => void;
  rowAmount: number;
  setRowAmount: (value: number) => void;
}) {
  if (editMode)
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
            <input
              type="number"
              value={tileAmount}
              min={1}
              max={64}
              onChange={(e) => setTileAmount(+e.target.value)}
              className="w-12 h-6 cursor-pointer rounded"
            />
            <input
              type="number"
              value={colAmount}
              min={1}
              max={8}
              onChange={(e) => setColAmount(+e.target.value)}
              className="w-12 h-6 cursor-pointer rounded"
            />
            <input
              type="number"
              value={rowAmount}
              min={1}
              max={8}
              onChange={(e) => setRowAmount(+e.target.value)}
              className="w-12 h-6 cursor-pointer rounded"
            />
            <EditButton editMode={editMode} setEditMode={setEditMode} />
          </div>
        </nav>
      </header>
    );
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

function ColorTile({ id, editMode }: { id: string; editMode: boolean }) {
  const [color, setColor] = useState("#ffffff");
  const [span, setSpan] = useState(1);
  const [vSpan, setVSpan] = useState(1);
  const scale = 100;

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
        className="border-2 border-amber-950 rounded-lg transition-colors flex items-center justify-center"
      >
        <TileSettings
          id={id}
          color={color}
          span={span}
          vSpan={vSpan}
          setColor={setColor}
          setSpan={setSpan}
          setVSpan={setVSpan}
        />
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
}: {
  editMode: boolean;
  tileAmount: number;
  colAmount: number;
  rowAmount: number;
}) {
  return (
    <div>
      <div
        className="grid gap-4 flex-wrap"
        style={{
          gridTemplateColumns: `repeat(${colAmount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rowAmount}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: tileAmount }).map((_, i) => (
          <ColorTile id={i.toString()} editMode={editMode} key={i} />
        ))}
      </div>
    </div>
  );
}

function TileSettings({
  id,
  color,
  span,
  vSpan,
  setColor,
  setSpan,
  setVSpan,
}: {
  id: string;
  color: string;
  span: number;
  vSpan: number;
  setColor: Function;
  setSpan: Function;
  setVSpan: Function;
}) {
  const dialogId: string = "drawer-" + id;
  return (
    <div>
      <button
        command="show-modal"
        commandfor={dialogId}
        className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold  inset-ring inset-ring-white/5 hover:bg-white/20"
      >
        Edit
      </button>
      <ElDialog>
        <dialog
          id={dialogId}
          aria-labelledby="drawer-title"
          className="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent"
        >
          <ElDialogBackdrop className="absolute inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></ElDialogBackdrop>

          <div className="absolute inset-0 pl-10 focus:outline-none sm:pl-16">
            <ElDialogPanel className="group/dialog-panel relative ml-auto block size-full max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out group-data-closed/dialog-panel:opacity-0 sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  command="close"
                  commandfor={dialogId}
                  className="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative flex h-full flex-col overflow-y-auto bg-gray-800 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                <div className="px-4 sm:px-6">
                  <h2
                    id="drawer-title"
                    className="text-base font-semibold text-white"
                  >
                    Panel title
                  </h2>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 cursor-pointer rounded"
                  />
                  <ValueEditor
                    value={span}
                    min={1}
                    max={6}
                    setterFunc={setSpan}
                  />
                  <ValueEditor
                    value={vSpan}
                    min={1}
                    max={6}
                    setterFunc={setVSpan}
                  />
                </div>
              </div>
            </ElDialogPanel>
          </div>
        </dialog>
      </ElDialog>
    </div>
  );
}

export function App() {
  const [editMode, setEditMode] = useState(false);
  const [tileAmount, setTileAmount] = useState(10);
  const [colAmount, setColAmount] = useState(6);
  const [rowAmount, setRowAmount] = useState(6);

  return (
    <div>
      <Header
        editMode={editMode}
        setEditMode={setEditMode}
        tileAmount={tileAmount}
        setTileAmount={setTileAmount}
        colAmount={colAmount}
        setColAmount={setColAmount}
        rowAmount={rowAmount}
        setRowAmount={setRowAmount}
      />
      <div className="p-8 flex gap-4 flex-wrap">
        <ColorTiles
          editMode={editMode}
          tileAmount={tileAmount}
          colAmount={colAmount}
          rowAmount={rowAmount}
        />
      </div>
    </div>
  );
}

export default App;
