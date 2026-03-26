import { useEffect, useState } from "react";

interface AlertPanelProps {
  level: "info" | "warning" | "critical";
  title: string;
  message: string;
  subtext?: string;
  onAcknowledge: () => void;
}

const levelConfig = {
  info: {
    cssClass: "alert-info",
    titleColor: "hsl(var(--primary))",
    label: "معلومات",
  },
  warning: {
    cssClass: "alert-warning",
    titleColor: "hsl(var(--accent))",
    label: "تحذير",
  },
  critical: {
    cssClass: "alert-critical",
    titleColor: "hsl(var(--destructive))",
    label: "خطر",
  },
};

export function AlertPanel({ level, title, message, subtext, onAcknowledge }: AlertPanelProps) {
  const cfg = levelConfig[level];
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (level === "critical") {
      const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }, 2000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [level]);

  return (
    <div className={`${cfg.cssClass} relative overflow-hidden`} style={{ padding: "1.5rem" }}>
      {level === "critical" && (
        <div style={{ position: "absolute", top: 12, left: 12, width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--destructive))" }} className="animate-blink" />
      )}

      <div style={{ transform: glitch ? "translateX(1px)" : "none", transition: "transform .05s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
          <span className="badge" style={{ borderColor: cfg.titleColor, color: cfg.titleColor, fontSize: ".65rem" }}>
            {cfg.label}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.2rem", color: cfg.titleColor, marginBottom: ".75rem" }}>
          {title}
        </h3>

        <p style={{ color: "rgba(255,255,255,.8)", lineHeight: 1.85, marginBottom: ".75rem", textAlign: "right" }}>
          {message}
        </p>

        {subtext && (
          <p style={{
            fontSize: ".9rem", color: "rgba(255,255,255,.45)",
            borderRight: `2px solid ${cfg.titleColor}`,
            paddingRight: "1rem", textAlign: "right", lineHeight: 1.7,
          }}>
            {subtext}
          </p>
        )}
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
        <button
          onClick={onAcknowledge}
          className="hacker-btn"
          style={{ padding: ".55rem 1.5rem", fontSize: ".85rem" }}
        >
          متابعة
        </button>
      </div>
    </div>
  );
}
