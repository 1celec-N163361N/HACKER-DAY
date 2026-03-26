import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";

export function LandingPage() {
  const [, setLocation] = useLocation();
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => setLocation("/story"), 700);
  };

  return (
    <div dir="rtl">
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 60, position: "relative" }}>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div style={{ position: "relative", zIndex: 20, textAlign: "center", padding: "0 1rem", maxWidth: 700, width: "100%" }}>
          <div style={{
            marginBottom: "1rem",
            opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "all .6s .1s",
          }}>
            <span className="badge badge-primary" style={{ fontSize: ".68rem", letterSpacing: ".1em" }}>
              سري -- للتوعية فقط
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--app-font-serif)", fontSize: "clamp(2.2rem, 7vw, 4rem)",
              lineHeight: 1.2, marginBottom: "1.25rem",
              opacity: started ? 0 : revealed ? 1 : 0,
              transform: started ? "scale(.9) translateY(-10px)" : revealed ? "scale(1) translateY(0)" : "scale(.95) translateY(10px)",
              transition: "all .7s cubic-bezier(.4,0,.2,1)",
              filter: flicker ? "brightness(1.5) blur(1px)" : "brightness(1) blur(0)",
              textShadow: flicker
                ? "0 0 30px rgba(129,140,248,.8), 2px 0 rgba(248,113,113,.4), -2px 0 rgba(52,211,153,.4)"
                : "0 0 20px rgba(129,140,248,.3)",
              background: "linear-gradient(135deg, hsl(var(--primary)), #a78bfa, hsl(var(--secondary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            يوم الهاكر الغير أخلاقي
          </h1>

          <p style={{
            color: "rgba(255,255,255,.75)", fontSize: "clamp(1rem, 3vw, 1.25rem)", marginBottom: ".6rem", lineHeight: 1.8,
            opacity: revealed ? 1 : 0, transition: "opacity .6s .3s",
            fontFamily: "var(--app-font-sans)", fontWeight: 500,
          }}>
            أنت الهاكر. اتخذ القرارات.
          </p>
          <p style={{
            color: "rgba(255,255,255,.3)", fontSize: "clamp(.75rem, 2.5vw, .88rem)", fontFamily: "var(--app-font-mono)", marginBottom: "2.5rem",
            opacity: revealed ? 1 : 0, transition: "opacity .6s .5s",
          }}>
            رحلة تفاعلية داخل يوم واحد -- قد يكون الأخير.
          </p>

          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
            opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: "all .6s .6s",
          }}>
            <button
              onClick={handleStart}
              className="hacker-btn"
              style={{
                fontSize: "1.15rem", padding: "1rem 3rem",
                opacity: started ? 0 : 1, transform: started ? "scale(.9)" : undefined,
                transition: "all .4s",
              }}
            >
              ابدأ الرحلة
            </button>

            <div style={{ display: "flex", gap: ".75rem", fontSize: "clamp(.7rem, 2vw, .82rem)", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href="/docs"
                className="footer-link"
                style={{ border: "none", background: "none", padding: 0, color: "rgba(129,140,248,.7)" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--primary))"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(129,140,248,.7)"}
              >
                التوثيق
              </a>
              <span style={{ color: "rgba(255,255,255,.1)" }}>|</span>
              <span style={{ color: "rgba(255,255,255,.28)", fontFamily: "var(--app-font-mono)" }}>~15 دقيقة</span>
              <span style={{ color: "rgba(255,255,255,.1)" }}>|</span>
              <span style={{ color: "rgba(255,255,255,.28)", fontFamily: "var(--app-font-mono)" }}>3 نهايات</span>
            </div>
          </div>

          <div style={{
            marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".75rem",
            opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(16px)",
            transition: "all .6s .8s",
          }}>
            {[
              { num: "3", label: "نهايات مختلفة" },
              { num: "12+", label: "محطة قصصية" },
              { num: "100%", label: "عربي" },
            ].map((stat) => (
              <div key={stat.label} className="feature-card" style={{ textAlign: "center", padding: "clamp(.9rem, 3vw, 1.5rem) .75rem" }}>
                <div style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: 800, fontFamily: "var(--app-font-mono)", color: "hsl(var(--primary))" }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: "clamp(.68rem, 2vw, .8rem)", color: "rgba(255,255,255,.4)", marginTop: ".3rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator" style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 1s 1.5s",
        }}>
          <span style={{ fontSize: ".65rem", fontFamily: "var(--app-font-mono)", color: "rgba(129,140,248,.4)" }}>انزل</span>
          <div className="scroll-indicator-line" />
          <div className="scroll-indicator-dot" />
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem 3rem" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem",
          marginBottom: "4rem",
        }}>
          {[
            { title: "قصة تفاعلية", desc: "كل قرار يأخذك لمسار مختلف. لا عودة، فقط نتائج.", accent: "hsl(var(--primary))" },
            { title: "محاكاة واقعية", desc: "طرفيات، رسائل مشفرة، وتنبيهات أمنية حقيقية.", accent: "hsl(var(--secondary))" },
            { title: "توعية أمنية", desc: "تعرّف على أساليب الاختراق وعواقبها القانونية.", accent: "hsl(var(--accent))" },
          ].map((f, i) => (
            <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 150}ms` }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: f.accent, marginBottom: ".75rem",
                boxShadow: `0 0 12px ${f.accent}`,
              }} />
              <h3 style={{
                fontFamily: "var(--app-font-serif)", fontSize: "1rem",
                color: "hsl(var(--foreground))", marginBottom: ".5rem",
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
          textClassName="scroll-reveal-arabic"
        >
          في كل يوم، يتعرض ملايين الأشخاص لهجمات إلكترونية. بياناتهم تُسرق. حساباتهم تُخترق. حياتهم الرقمية تُدمر. والمهاجم يجلس خلف شاشة في غرفة مظلمة يظن أنه بأمان.
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
          textClassName="scroll-reveal-arabic"
        >
          هذه التجربة التفاعلية تضعك في مكان ذلك الشخص. ليس لتعلّمك الاختراق بل لتريك العواقب الحقيقية. القرارات التي تتخذها ستحدد مصيرك.
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
          textClassName="scroll-reveal-arabic"
        >
          ثلاث نهايات محتملة: القبض عليك. التوبة والعودة للطريق الصحيح. أو الهروب المؤقت. أي مسار ستختار؟
        </ScrollReveal>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <button
            onClick={handleStart}
            className="hacker-btn"
            style={{ fontSize: "1.1rem", padding: "1rem 3rem" }}
          >
            ابدأ الرحلة الآن
          </button>
        </div>
      </div>
    </div>
  );
}
