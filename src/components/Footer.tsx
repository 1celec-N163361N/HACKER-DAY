export function Footer() {
  const socials = [
    { href: "https://x.com/N163361N", label: "X" },
    { href: "https://discord.gg/MQgaPegSgA", label: "Discord" },
    { href: "https://github.com/1celec-N163361N/", label: "GitHub" },
    { href: "https://cranl.com", label: "cranl.com" },
  ];

  return (
    <footer
      dir="rtl"
      style={{
        borderTop: "1px solid rgba(255,255,255,.06)",
        background: "rgba(14,11,28,.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "2rem 1.5rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.1rem", color: "hsl(var(--primary))", marginBottom: ".4rem" }}>
              يوم الهاكر الغير أخلاقي
            </p>
            <p style={{ fontFamily: "var(--app-font-mono)", fontSize: ".72rem", color: "rgba(255,255,255,.3)", lineHeight: 1.6 }}>
              هذا الموقع للتوعية فقط -- لا يحث على أي نشاط غير قانوني
            </p>
            <p style={{ fontFamily: "var(--app-font-mono)", fontSize: ".68rem", color: "rgba(129,140,248,.35)", marginTop: ".35rem" }}>
              {new Date().getFullYear()} cranl.com
            </p>
          </div>

          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
