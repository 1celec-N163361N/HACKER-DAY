import { useState } from "react";
import { docsSections } from "@/data/docs";

export function DocsPage() {
  const [activeSection, setActiveSection] = useState(docsSections[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const currentSection = docsSections.find((s) => s.id === activeSection) ?? docsSections[0];

  const filteredContent = searchQuery.trim()
    ? docsSections.flatMap((s) =>
        s.content
          .filter(
            (item) =>
              item.term.includes(searchQuery) ||
              item.definition.includes(searchQuery)
          )
          .map((item) => ({ ...item, sectionTitle: s.title }))
      )
    : null;

  return (
    <div dir="rtl" style={{ minHeight: "100vh", paddingTop: 70 }}>
      <div style={{
        padding: "1.5rem 1rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        background: "linear-gradient(180deg, rgba(129,140,248,.04), transparent)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
            <h1 style={{
              fontFamily: "var(--app-font-serif)", fontSize: "1.3rem",
              color: "hsl(var(--primary))", margin: 0, whiteSpace: "nowrap",
            }}>
              التوثيق
            </h1>
            <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", fontFamily: "var(--app-font-sans)" }}>
              دليل شامل لعالم أمن المعلومات
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="ابحث في التوثيق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", fontSize: ".85rem", paddingRight: "2.5rem" }}
            />
            <span style={{
              position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
              fontFamily: "var(--app-font-mono)", fontSize: ".7rem",
              color: "rgba(129,140,248,.4)", pointerEvents: "none",
            }}>
              /
            </span>
          </div>
        </div>
      </div>

      {!searchQuery && (
        <div style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          padding: ".6rem 1rem",
        }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            display: "flex", gap: ".4rem",
            minWidth: "max-content",
          }}>
            {docsSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: ".4rem",
                    padding: ".5rem .85rem",
                    borderRadius: 12,
                    border: isActive ? "2px solid rgba(129,140,248,.5)" : "2px solid transparent",
                    background: isActive ? "rgba(129,140,248,.1)" : "transparent",
                    color: isActive ? "hsl(var(--primary))" : "rgba(255,255,255,.45)",
                    fontFamily: "var(--app-font-sans)", fontWeight: 600,
                    fontSize: ".8rem",
                    cursor: "pointer", transition: "all .2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--app-font-mono)", fontSize: ".65rem",
                    color: isActive ? "hsl(var(--primary))" : "rgba(255,255,255,.2)",
                  }}>
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.25rem 1rem 3rem" }}>
        {searchQuery && filteredContent ? (
          <div>
            <p style={{ fontFamily: "var(--app-font-mono)", fontSize: ".75rem", color: "rgba(255,255,255,.35)", marginBottom: "1rem" }}>
              {filteredContent.length} نتيجة للبحث عن "{searchQuery}"
            </p>
            {filteredContent.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p style={{ color: "rgba(255,255,255,.25)", fontSize: "1rem", marginBottom: ".5rem" }}>لا توجد نتائج</p>
                <p style={{ color: "rgba(255,255,255,.15)", fontSize: ".8rem", fontFamily: "var(--app-font-mono)" }}>جرّب كلمات مختلفة</p>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {filteredContent.map((item, i) => (
                <DocCard key={i} item={item} sectionLabel={item.sectionTitle} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.25rem" }}>
              <span className="badge badge-primary" style={{ fontSize: ".68rem" }}>{currentSection.icon}</span>
              <h2 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.2rem", color: "hsl(var(--primary))" }}>
                {currentSection.title}
              </h2>
              <span style={{ fontSize: ".7rem", color: "rgba(255,255,255,.2)", fontFamily: "var(--app-font-mono)" }}>
                {currentSection.content.length} عنصر
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {currentSection.content.map((item, i) => (
                <DocCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DocCard({ item, sectionLabel, index }: { item: { term: string; definition: string; example?: string; warning?: string }; sectionLabel?: string; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        cursor: "pointer",
        borderColor: open ? "rgba(129,140,248,.6)" : undefined,
        borderWidth: open ? 3 : 3,
        boxShadow: open ? "var(--shadow), 0 0 20px rgba(129,140,248,.06)" : undefined,
        animationDelay: index !== undefined ? `${index * 60}ms` : undefined,
      }}
      onClick={() => setOpen((o) => !o)}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: ".9rem 1.1rem",
        gap: ".5rem",
      }}>
        <span style={{
          fontFamily: "var(--app-font-sans)", fontWeight: 700,
          fontSize: ".9rem", color: open ? "hsl(var(--primary))" : "hsl(var(--foreground))",
          flex: 1, minWidth: 0,
          transition: "color .2s",
        }}>
          {item.term}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem", flexShrink: 0 }}>
          {sectionLabel && (
            <span style={{ fontSize: ".6rem", fontFamily: "var(--app-font-mono)", color: "rgba(255,255,255,.2)" }}>
              [{sectionLabel}]
            </span>
          )}
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: ".7rem",
            color: open ? "hsl(var(--primary))" : "rgba(255,255,255,.3)",
            transition: "transform .3s, color .2s",
            display: "inline-block",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}>
            +
          </span>
        </div>
      </div>

      {open && (
        <div style={{ padding: "0 1.1rem 1.1rem", borderTop: "1px solid rgba(255,255,255,.06)" }} className="animate-fade-in">
          <p style={{
            color: "rgba(255,255,255,.7)", lineHeight: 1.9,
            fontSize: ".88rem", textAlign: "right", paddingTop: ".85rem",
          }}>
            {item.definition}
          </p>
          {item.example && (
            <div style={{
              marginTop: ".75rem", padding: ".75rem 1rem",
              background: "rgba(129,140,248,.05)",
              border: "1px solid rgba(129,140,248,.15)",
              borderRadius: 12,
            }}>
              <p style={{ fontSize: ".68rem", fontFamily: "var(--app-font-mono)", color: "hsl(var(--primary))", marginBottom: ".35rem", letterSpacing: ".05em" }}>
                مثال
              </p>
              <p style={{ fontSize: ".84rem", color: "rgba(255,255,255,.55)", textAlign: "right", whiteSpace: "pre-line", lineHeight: 1.7 }}>
                {item.example}
              </p>
            </div>
          )}
          {item.warning && (
            <div style={{
              marginTop: ".75rem", padding: ".75rem 1rem",
              background: "rgba(248,113,113,.04)",
              border: "1px solid rgba(248,113,113,.2)",
              borderRadius: 12,
            }}>
              <p style={{ fontSize: ".84rem", color: "rgba(248,113,113,.75)", textAlign: "right", lineHeight: 1.7 }}>
                {item.warning}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
