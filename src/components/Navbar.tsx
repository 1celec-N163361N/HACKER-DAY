import { useState } from "react";
import { useLocation } from "wouter";
import { useReadingMode } from "@/context/ReadingMode";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { active, toggle } = useReadingMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "الرئيسية" },
    { path: "/story", label: "القصة" },
    { path: "/docs", label: "التوثيق" },
  ];

  const navigate = (path: string) => {
    setLocation(path);
    setMenuOpen(false);
  };

  return (
    <header
      dir="rtl"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(14,11,28,.88)",
        backdropFilter: "blur(24px) saturate(1.2)",
        WebkitBackdropFilter: "blur(24px) saturate(1.2)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        boxShadow: "0 4px 30px rgba(0,0,0,.3)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "var(--app-font-serif)", fontSize: "1.05rem",
            color: "hsl(var(--primary))", background: "none", border: "none",
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: ".5rem",
          }}
        >
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" style={{ height: 28, width: "auto", filter: "drop-shadow(0 0 6px rgba(129,140,248,.3))" }} />
          HACKER//DAY
        </button>

        <nav className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
          <button
            onClick={toggle}
            style={{
              fontFamily: "var(--app-font-mono)",
              fontWeight: 700, fontSize: ".72rem",
              padding: ".3rem .65rem",
              borderRadius: 8,
              border: active ? "1px solid rgba(52,211,153,.6)" : "1px solid rgba(255,255,255,.12)",
              background: active ? "rgba(52,211,153,.1)" : "rgba(255,255,255,.03)",
              color: active ? "hsl(var(--secondary))" : "rgba(255,255,255,.35)",
              cursor: "pointer", transition: "all .2s",
            }}
          >
            // قراءة
          </button>

          {links.map((l) => {
            const isActive = location === l.path;
            return (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 700, fontSize: ".82rem",
                  padding: ".35rem .8rem",
                  borderRadius: 8,
                  border: isActive ? "1px solid rgba(129,140,248,.5)" : "1px solid transparent",
                  background: isActive ? "rgba(129,140,248,.1)" : "transparent",
                  color: isActive ? "hsl(var(--primary))" : "rgba(255,255,255,.5)",
                  cursor: "pointer", transition: "all .2s",
                  position: "relative",
                }}
              >
                {l.label}
              </button>
            );
          })}
          <button
            onClick={() => navigate("/story")}
            className="hacker-btn"
            style={{ padding: ".35rem .9rem", fontSize: ".78rem", borderWidth: 2, borderRadius: 10 }}
          >
            ابدأ التجربة
          </button>
        </nav>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,.6)", fontSize: "1.4rem",
            padding: ".25rem",
          }}
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="navbar-mobile-menu"
          style={{
            background: "rgba(14,11,28,.96)",
            borderTop: "1px solid rgba(255,255,255,.06)",
            padding: ".75rem 1rem 1rem",
            display: "flex", flexDirection: "column", gap: ".4rem",
          }}
        >
          {links.map((l) => {
            const isActive = location === l.path;
            return (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 700, fontSize: ".92rem",
                  padding: ".65rem 1rem",
                  borderRadius: 10,
                  border: isActive ? "1px solid rgba(129,140,248,.4)" : "1px solid rgba(255,255,255,.06)",
                  background: isActive ? "rgba(129,140,248,.08)" : "rgba(255,255,255,.02)",
                  color: isActive ? "hsl(var(--primary))" : "rgba(255,255,255,.55)",
                  cursor: "pointer", textAlign: "right",
                  width: "100%", transition: "all .2s",
                }}
              >
                {l.label}
              </button>
            );
          })}
          <div style={{ display: "flex", gap: ".4rem", marginTop: ".25rem" }}>
            <button
              onClick={() => navigate("/story")}
              className="hacker-btn"
              style={{ flex: 1, padding: ".55rem", fontSize: ".88rem", borderRadius: 10, borderWidth: 2 }}
            >
              ابدأ التجربة
            </button>
            <button
              onClick={() => { toggle(); setMenuOpen(false); }}
              style={{
                fontFamily: "var(--app-font-mono)",
                fontWeight: 700, fontSize: ".72rem",
                padding: ".45rem .65rem",
                borderRadius: 10,
                border: active ? "1px solid rgba(52,211,153,.5)" : "1px solid rgba(255,255,255,.12)",
                background: active ? "rgba(52,211,153,.08)" : "rgba(255,255,255,.03)",
                color: active ? "hsl(var(--secondary))" : "rgba(255,255,255,.35)",
                cursor: "pointer",
              }}
            >
              // قراءة
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
