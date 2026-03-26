export default function NotFound() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--app-font-mono)", fontSize: "3rem",
          color: "hsl(var(--destructive))", marginBottom: "1rem",
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: "var(--app-font-serif)", fontSize: "1.5rem",
          color: "hsl(var(--foreground))", marginBottom: ".75rem",
        }}>
          الصفحة غير موجودة
        </h1>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".9rem", marginBottom: "1.5rem" }}>
          يبدو أنك وصلت لطريق مسدود.
        </p>
        <a href="/" className="hacker-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}
