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
  return (
    <div className="flex gap-3 items-center">
      <span>{value}</span>
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
