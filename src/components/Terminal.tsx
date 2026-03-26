import { useState, useEffect, useRef } from "react";
import { TerminalCommand } from "@/data/story";

interface TerminalProps {
  commands: TerminalCommand[];
  onComplete: () => void;
}

export function Terminal({ commands, onComplete }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<{ type: "cmd" | "out"; text: string }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const [typedCmd, setTypedCmd] = useState("");
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines, typedCmd]);

  useEffect(() => {
    if (currentIdx >= commands.length) {
      setDone(true);
      return;
    }
    const cmd = commands[currentIdx];
    const delay = cmd.delay ?? 600;

    setTyping(true);
    setTypedCmd("");

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedCmd(cmd.command.slice(0, i));
      if (i >= cmd.command.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTyping(false);
          setVisibleLines((prev) => [
            ...prev,
            { type: "cmd", text: cmd.command },
            { type: "out", text: cmd.output },
          ]);
          setTypedCmd("");
          setCurrentIdx((idx) => idx + 1);
        }, delay);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [currentIdx]);

  return (
    <div className="terminal-window">
      <div className="terminal-topbar">
        <span className="terminal-dot" style={{ background: "#f87171" }} />
        <span className="terminal-dot" style={{ background: "#fbbf24" }} />
        <span className="terminal-dot" style={{ background: "#34d399" }} />
        <span className="mono text-xs mr-3" style={{ color: "rgba(52,211,153,.5)", fontSize: ".75rem" }}>
          root@kali:~#
        </span>
      </div>

      <div
        ref={bodyRef}
        className="terminal-body"
        style={{ maxHeight: "360px", overflowY: "auto" }}
      >
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={line.type === "cmd" ? "" : "terminal-output"}
            style={line.type === "cmd" ? { color: "var(--clr-secondary)" } : {}}
          >
            {line.type === "cmd" && (
              <span style={{ color: "rgba(52,211,153,.45)", marginLeft: ".4rem" }}>$ </span>
            )}
            {line.text}
          </div>
        ))}

        {typing && (
          <div style={{ color: "var(--clr-secondary)" }}>
            <span style={{ color: "rgba(52,211,153,.45)", marginLeft: ".4rem" }}>$ </span>
            {typedCmd}
            <span className="animate-blink">▌</span>
          </div>
        )}
      </div>

      {done && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(0,0,0,.5)",
            borderTop: "1px solid rgba(52,211,153,.15)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={onComplete} className="btn-secondary" style={{ padding: ".6rem 1.75rem", fontSize: ".85rem" }}>
            متابعة ←
          </button>
        </div>
      )}
    </div>
  );
}
