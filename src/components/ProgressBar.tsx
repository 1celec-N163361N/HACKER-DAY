interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div style={{
      background: "rgba(14,11,28,.5)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,.06)",
      borderRadius: 14,
      padding: ".65rem 1.1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".4rem" }}>
        {label && (
          <span style={{
            fontFamily: "var(--app-font-sans)", fontSize: ".76rem",
            color: "rgba(255,255,255,.45)", fontWeight: 600,
          }}>
            {label}
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: ".7rem",
            color: "rgba(255,255,255,.3)",
          }}>
            {current}/{total}
          </span>
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: ".78rem",
            color: pct >= 80 ? "hsl(var(--secondary))" : "hsl(var(--primary))", fontWeight: 700,
            transition: "color .3s",
          }}>
            {pct}%
          </span>
        </div>
      </div>
      <div style={{
        width: "100%", height: 5, borderRadius: 3,
        background: "rgba(255,255,255,.05)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 3,
          width: `${pct}%`,
          background: pct >= 80
            ? "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))"
            : "linear-gradient(90deg, hsl(var(--primary)), rgba(129,140,248,.6))",
          transition: "width .6s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 0 8px rgba(129,140,248,.25)",
        }} />
      </div>
    </div>
  );
}
