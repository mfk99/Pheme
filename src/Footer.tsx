import { ValueEditor } from "./ValueEditor";

export function Footer({
  editMode,
  tileAmount,
  colAmount,
  rowAmount,
  setTileAmount,
  setColAmount,
  setRowAmount,
}: {
  editMode: boolean;
  tileAmount: number;
  colAmount: number;
  rowAmount: number;
  setTileAmount: Function;
  setColAmount: Function;
  setRowAmount: Function;
}) {
  return (
    <footer
      className={`p-4 h-1/3 bg-neutral-primary-soft border-t border-default shadow-sm md:flex md:items-center md:justify-between md:p-6 transition-transform duration-300 ${
        editMode ? "translate-y-0" : "translate-y-full"
      }`}
    >
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
    </footer>
  );
}
