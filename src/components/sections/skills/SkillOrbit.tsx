const nodes = ["JS", "React", "Next", "Node", "Mongo", "SQL", "Figma", "AI"];

const RADIUS = 132;
const DURATION = "38s";

export default function SkillOrbit() {
  const n = nodes.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, var(--glow), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 rounded-full border border-dashed border-border" />
      <div className="absolute inset-8 rounded-full border border-border" />

      {/* center hub */}
      <div className="glass absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center">
        <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.15em] text-text-secondary">
          Core
          <br />
          Stack
        </span>
      </div>

      <div
        className="absolute inset-0"
        style={{ animation: `orbit-spin ${DURATION} linear infinite` }}
      >
        {nodes.map((label, i) => {
          const angle = (360 / n) * i;
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 h-12 w-12"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${RADIUS}px) rotate(${-angle}deg)`,
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-[10px] font-medium text-text-primary shadow-soft"
                style={{ animation: `orbit-spin-reverse ${DURATION} linear infinite` }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
