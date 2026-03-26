import { StoryNode } from "@/data/story";
import { useEffect, useState } from "react";

interface EndingPageProps {
  node: StoryNode;
  visitedCount: number;
  onRestart: () => void;
}

const endingConfig = {
  caught: {
    borderColor: "rgba(248,113,113,.5)",
    bgColor: "rgba(248,113,113,.04)",
    glowColor: "rgba(248,113,113,.08)",
    titleColor: "hsl(var(--destructive))",
    label: "القبض",
    ascii: `
 ██████╗  █████╗ ██╗   ██╗ ██████╗ ██╗  ██╗████████╗
██╔════╝██╔══██╗██║   ██║██╔════╝ ██║  ██║╚══██╔══╝
██║     ███████║██║   ██║██║  ███╗███████║   ██║
██║     ██╔══██║██║   ██║██║   ██║██╔══██║   ██║
╚██████╗██║  ██║╚██████╔╝╚██████╔╝██║  ██║   ██║
 ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝`,
  },
  repent: {
    borderColor: "rgba(52,211,153,.5)",
    bgColor: "rgba(52,211,153,.04)",
    glowColor: "rgba(52,211,153,.08)",
    titleColor: "hsl(var(--secondary))",
    label: "التوبة",
    ascii: `
██████╗ ███████╗██████╗ ███████╗███╗   ██╗████████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
██████╔╝█████╗  ██████╔╝█████╗  ██╔██╗ ██║   ██║
██╔══██╗██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║   ██║
██║  ██║███████╗██║     ███████╗██║ ╚████║   ██║
╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝   ╚═╝`,
  },
  escape: {
    borderColor: "rgba(251,191,36,.5)",
    bgColor: "rgba(251,191,36,.04)",
    glowColor: "rgba(251,191,36,.08)",
    titleColor: "hsl(var(--accent))",
    label: "الهروب",
    ascii: `
███████╗███████╗ ██████╗ █████╗ ██████╗ ███████╗
██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝
█████╗  ███████╗██║     ███████║██████╔╝█████╗
██╔══╝  ╚════██║██║     ██╔══██║██╔═══╝ ██╔══╝
███████╗███████║╚██████╗██║  ██║██║     ███████╗
╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝`,
  },
};

export function EndingPage({ node, visitedCount, onRestart }: EndingPageProps) {
  const [reveal, setReveal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const cfg = endingConfig[node.ending ?? "repent"];

  useEffect(() => {
    const t1 = setTimeout(() => setReveal(true), 300);
    const t2 = setTimeout(() => setShowMessage(true), 1000);
    const t3 = setTimeout(() => setShowActions(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", paddingTop: 80 }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <div style={{
          opacity: reveal ? 1 : 0, transform: reveal ? "scale(1)" : "scale(.95)",
          transition: "all .7s ease",
        }}>
          <div style={{
            border: `2px solid ${cfg.borderColor}`,
            background: cfg.bgColor,
            borderRadius: 20, padding: "2.5rem 2rem", textAlign: "center",
            boxShadow: `0 0 40px ${cfg.glowColor}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: `linear-gradient(90deg, transparent, ${cfg.borderColor}, transparent)`,
            }} />

            <pre style={{
              fontFamily: "var(--app-font-mono)", fontSize: ".45rem",
              color: cfg.titleColor, opacity: .4, marginBottom: "1.25rem",
              overflowX: "auto", lineHeight: 1.2,
            }}>
              {cfg.ascii}
            </pre>

            <span className="badge" style={{ borderColor: cfg.borderColor, color: cfg.titleColor, marginBottom: ".75rem", display: "inline-block" }}>
              {cfg.label}
            </span>

            <h2 style={{
              fontFamily: "var(--app-font-serif)", fontSize: "1.4rem",
              color: cfg.titleColor, marginBottom: ".5rem", marginTop: ".5rem",
            }}>
              {node.endingTitle}
            </h2>

            <p style={{ color: "rgba(255,255,255,.3)", fontSize: ".8rem", fontFamily: "var(--app-font-mono)", marginBottom: "1.5rem" }}>
              زرت {visitedCount} محطة في هذه الرحلة
            </p>

            {showMessage && (
              <div style={{
                textAlign: "right", marginBottom: "2rem",
                opacity: showMessage ? 1 : 0, transition: "opacity .5s",
              }}>
                <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 2, marginBottom: "1rem" }}>
                  {node.narrative}
                </p>
                {node.endingMessage && (
                  <div style={{
                    borderRight: `2px solid ${cfg.borderColor}`,
                    background: "rgba(0,0,0,.15)",
                    borderRadius: 12, padding: "1rem",
                  }}>
                    <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.8 }}>
                      {node.endingMessage}
                    </p>
                  </div>
                )}
              </div>
            )}

            {showActions && (
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }} className="animate-fade-in">
                <button onClick={onRestart} className="hacker-btn" style={{ width: "100%", padding: ".8rem", borderRadius: 14 }}>
                  العب مرة أخرى -- اختر مسار مختلف
                </button>
                <a
                  href="/docs"
                  className="btn-ghost"
                  style={{ width: "100%", textAlign: "center", textDecoration: "none" }}
                >
                  اقرأ التوثيق -- تعلّم أكثر
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
