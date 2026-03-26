import { useState } from "react";
import { Choice } from "@/data/story";

interface ChoicePanelProps {
  choices: Choice[];
  onChoose: (nextNodeId: string) => void;
}

export function ChoicePanel({ choices, onChoose }: ChoicePanelProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChoice = (choice: Choice) => {
    if (selected) return;
    setSelected(choice.id);
    setTimeout(() => onChoose(choice.nextNodeId), 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
      <p style={{
        fontFamily: "var(--app-font-mono)", fontSize: ".72rem",
        color: "rgba(255,255,255,.35)", textAlign: "center",
        textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".25rem",
      }}>
        اختر مسارك
      </p>
      {choices.map((choice, i) => (
        <button
          key={choice.id}
          onClick={() => handleChoice(choice)}
          disabled={selected !== null}
          className={`choice-btn ${choice.danger ? "danger" : ""}`}
          style={{
            opacity: selected !== null && selected !== choice.id ? 0.3 : 1,
            borderColor: selected === choice.id ? "hsl(var(--primary))" : undefined,
            background: selected === choice.id ? "rgba(129,140,248,.15)" : undefined,
            animationDelay: `${i * 80}ms`,
          }}
        >
          <span>{choice.text}</span>
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: ".72rem",
            color: choice.danger ? "hsl(var(--destructive))" : "rgba(255,255,255,.25)",
          }}>
            {selected === choice.id ? "[OK]" : choice.danger ? "[!]" : `[${i + 1}]`}
          </span>
        </button>
      ))}
    </div>
  );
}
