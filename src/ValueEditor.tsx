export function ValueEditor({
  min,
  max,
  value,
  setterFunc,
}: {
  min: number;
  max: number;
  value: number;
  setterFunc: Function;
}) {
  const cols = 1;
  const rows = 1;
  return (
    <div>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setterFunc(+e.target.value)}
        className="w-12 h-12 cursor-pointer rounded"
      />
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setterFunc(+e.target.value)}
      ></input>
    </div>
  );
}
