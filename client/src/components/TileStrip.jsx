// Decorative band along the bottom of article heroes: circles alternating with rotated half-pills.
const PILL_ROTATIONS = ['', 'rotate-[180deg]', 'rotate-[-90deg]'];
const TILES = Array.from({ length: 52 }, (_, i) =>
  i % 2 === 0
    ? 'rounded-full'
    : `rounded-br-full rounded-tr-full ${PILL_ROTATIONS[((i - 1) / 2) % 3]}`.trim()
);

export default function TileStrip() {
  return (
    <div className="absolute z-30 left-0 bottom-0 flex h-[100px] bg-[#1A308D] py-[2px]" aria-hidden="true">
      {TILES.map((shape, i) => (
        <div key={i} className={`aspect-square h-[96px] shrink-0 bg-[#2b3990] ${shape}`} />
      ))}
    </div>
  );
}
