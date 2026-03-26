import { useState, useEffect } from "react";

interface MessageBubbleProps {
  from: string;
  content: string;
  onComplete: () => void;
}

export function MessageBubble({ from, content, onComplete }: MessageBubbleProps) {
  const [visible, setVisible] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const isOutgoing = from.startsWith("أنت");

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 400);
    const t2 = setTimeout(() => setShowBtn(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
        <div className="chat-window">
          <div style={{
            display: "flex", alignItems: "center", gap: ".75rem",
            padding: ".85rem 1.1rem",
            borderBottom: "2px solid rgba(255,255,255,.08)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: isOutgoing ? "rgba(129,140,248,.2)" : "rgba(52,211,153,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--app-font-mono)", fontSize: ".75rem",
              color: isOutgoing ? "hsl(var(--primary))" : "hsl(var(--secondary))",
              border: `2px solid ${isOutgoing ? "rgba(129,140,248,.4)" : "rgba(52,211,153,.4)"}`,
            }}>
              {isOutgoing ? "TX" : "RX"}
            </div>
            <div>
              <p style={{ fontSize: ".9rem", fontWeight: 700, color: "hsl(var(--foreground))" }}>
                {from.replace("أنت ", "")}
              </p>
              <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.35)", fontFamily: "var(--app-font-mono)" }}>
                رسالة مشفرة
              </p>
            </div>
          </div>

          <div style={{
            padding: "1.1rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "all .6s ease",
          }}>
            <div style={{
              borderRadius: 14,
              padding: ".9rem 1rem",
              maxWidth: "88%",
              marginRight: isOutgoing ? 0 : "auto",
              marginLeft: isOutgoing ? "auto" : 0,
              background: isOutgoing ? "rgba(129,140,248,.12)" : "rgba(55,47,87,.6)",
              border: `2px solid ${isOutgoing ? "rgba(129,140,248,.3)" : "rgba(255,255,255,.1)"}`,
            }}>
              <p style={{
                fontSize: ".95rem", color: "rgba(255,255,255,.88)",
                whiteSpace: "pre-line", lineHeight: 1.7, textAlign: "right",
              }}>
                {content}
              </p>
            </div>
          </div>

          <div style={{ padding: ".4rem 1.1rem .6rem", textAlign: "left" }}>
            <span style={{ fontSize: ".7rem", color: "rgba(255,255,255,.25)", fontFamily: "var(--app-font-mono)" }}>
              الآن
            </span>
          </div>
        </div>
      </div>

      {showBtn && (
        <button onClick={onComplete} className="hacker-btn animate-fade-in" style={{ padding: ".55rem 1.5rem", fontSize: ".85rem" }}>
          متابعة
        </button>
      )}
    </div>
  );
}
