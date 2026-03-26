import { useState, useEffect, useMemo } from "react";
import { storyNodes, firstNodeId, StoryNode } from "@/data/story";
import { Terminal } from "@/components/Terminal";
import { MessageBubble } from "@/components/MessageBubble";
import { AlertPanel } from "@/components/AlertPanel";
import { ChoicePanel } from "@/components/ChoicePanel";
import { ProgressBar } from "@/components/ProgressBar";
import { EndingPage } from "@/pages/EndingPage";

function computeMaxDepth(): number {
  const memo: Record<string, number> = {};
  const visiting = new Set<string>();
  function dfs(id: string): number {
    if (memo[id] !== undefined) return memo[id];
    const node = storyNodes[id];
    if (!node || node.type === "ending") { memo[id] = 1; return 1; }
    if (visiting.has(id)) { memo[id] = 1; return 1; }
    visiting.add(id);
    let best = 0;
    if (node.choices) {
      for (const c of node.choices) {
        best = Math.max(best, dfs(c.nextNodeId));
      }
    }
    if (node.nextNodeId) {
      best = Math.max(best, dfs(node.nextNodeId));
    }
    visiting.delete(id);
    memo[id] = 1 + best;
    return memo[id];
  }
  return dfs(firstNodeId);
}

const NODE_TYPE_LABELS: Record<string, string> = {
  terminal: "TERMINAL",
  message: "رسالة",
  alert: "تنبيه",
  story: "السرد",
  choice: "اختيار",
};

export function StoryPage() {
  const maxDepth = useMemo(() => computeMaxDepth(), []);
  const [nodeId, setNodeId] = useState(firstNodeId);
  const [visitedCount, setVisitedCount] = useState(1);
  const [showNode, setShowNode] = useState(false);
  const [narrativeVisible, setNarrativeVisible] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);

  const node: StoryNode = storyNodes[nodeId];

  const showNarrativeInMain = node.type === "story" || node.type === "terminal";

  useEffect(() => {
    setShowNode(false);
    setNarrativeVisible(false);
    setChoicesVisible(false);

    const t1 = setTimeout(() => setShowNode(true), 80);
    const t2 = setTimeout(() => setNarrativeVisible(true), 350);
    const t3 = setTimeout(() => {
      if (node.type === "story") setChoicesVisible(true);
    }, 900);

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [nodeId]);

  const advance = (nextId: string) => {
    setVisitedCount((c) => c + 1);
    setNodeId(nextId);
  };

  if (node.type === "ending") {
    return (
      <EndingPage
        node={node}
        visitedCount={visitedCount}
        onRestart={() => { setNodeId(firstNodeId); setVisitedCount(1); }}
      />
    );
  }

  return (
    <div dir="rtl" style={{ minHeight: "100vh", paddingTop: 70 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem 4rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <ProgressBar current={visitedCount} total={maxDepth} label="تقدم القصة" />
        </div>

        <div className="story-container" style={{
          opacity: showNode ? 1 : 0,
          transform: showNode ? "translateY(0)" : "translateY(16px)",
          transition: "all .5s ease",
        }}>
          {node.title && (node.type === "story" || node.type === "terminal") && (
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-primary" style={{ marginBottom: ".5rem", display: "inline-block" }}>
                {NODE_TYPE_LABELS[node.type] ?? "---"}
              </span>
              <h2 style={{
                fontFamily: "var(--app-font-serif)", fontSize: "1.5rem",
                color: "hsl(var(--primary))", marginTop: ".5rem",
              }}>
                {node.title}
              </h2>
              <div style={{
                height: 2, marginTop: "1rem",
                background: "linear-gradient(90deg, rgba(129,140,248,.3), transparent)",
              }} />
            </div>
          )}

          {showNarrativeInMain && (
            <div style={{
              opacity: narrativeVisible ? 1 : 0,
              transform: narrativeVisible ? "translateY(0)" : "translateY(8px)",
              transition: "all .6s ease .1s",
            }}>
              <p style={{
                color: "rgba(255,255,255,.85)", lineHeight: 2.1, fontSize: "1.05rem",
                textAlign: "right", marginBottom: "1rem",
              }}>
                {node.narrative}
              </p>
              {node.subtext && (
                <div style={{
                  borderRight: "3px solid rgba(129,140,248,.4)",
                  paddingRight: "1rem",
                  background: "rgba(129,140,248,.04)",
                  borderRadius: "0 12px 12px 0",
                  padding: ".75rem 1rem",
                  marginBottom: "1.5rem",
                }}>
                  <p style={{
                    fontSize: ".92rem", color: "rgba(255,255,255,.45)",
                    textAlign: "right", lineHeight: 1.8,
                  }}>
                    {node.subtext}
                  </p>
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: "1rem" }}>
            {node.type === "terminal" && node.terminalCommands && (
              <div style={{ marginBottom: "1.5rem" }}>
                <Terminal
                  commands={node.terminalCommands}
                  onComplete={() => {
                    if (node.nextNodeId) advance(node.nextNodeId);
                    else if (node.choices) setChoicesVisible(true);
                  }}
                />
              </div>
            )}

            {node.type === "message" && node.messageFrom && node.messageContent && (
              <div style={{ marginBottom: "1.5rem" }}>
                <MessageBubble
                  from={node.messageFrom}
                  content={node.messageContent}
                  onComplete={() => {
                    if (node.nextNodeId) advance(node.nextNodeId);
                    else if (node.choices) setChoicesVisible(true);
                  }}
                />
              </div>
            )}

            {node.type === "alert" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <AlertPanel
                  level={node.alertLevel ?? "info"}
                  title={node.title ?? "تنبيه"}
                  message={node.narrative}
                  subtext={node.subtext}
                  onAcknowledge={() => {
                    if (node.choices) setChoicesVisible(true);
                    else if (node.nextNodeId) advance(node.nextNodeId);
                  }}
                />
              </div>
            )}

            {choicesVisible && node.choices && node.choices.length > 0 && (
              <div className="animate-fade-in">
                <ChoicePanel choices={node.choices} onChoose={advance} />
              </div>
            )}

            {node.type === "story" && !node.choices && node.nextNodeId && choicesVisible && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
                <button onClick={() => advance(node.nextNodeId!)} className="hacker-btn">
                  متابعة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
