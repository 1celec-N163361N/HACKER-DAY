import { Switch, Route, Router as WouterRouter } from "wouter";
import { Suspense, lazy } from "react";
import NotFound from "@/pages/not-found";
import { LandingPage } from "@/pages/LandingPage";
import { StoryPage } from "@/pages/StoryPage";
import { DocsPage } from "@/pages/DocsPage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReadingModeProvider, useReadingMode } from "@/context/ReadingMode";

const PixelBlast = lazy(() => import("@/components/PixelBlast"));

function ReadingBackdrop({ children }: { children: React.ReactNode }) {
  const { active } = useReadingMode();
  return (
    <div style={{
      position: "relative",
      ...(active ? {
        background: "rgba(10, 8, 20, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 0,
        transition: "background .4s ease, backdrop-filter .4s ease",
      } : {
        background: "transparent",
        transition: "background .4s ease",
      }),
    }}>
      {children}
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      <Suspense fallback={null}>
        <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#B19EEF"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            transparent
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Suspense>
      <Navbar />
      <main style={{ flex: 1 }}>
        <ReadingBackdrop>
          {children}
        </ReadingBackdrop>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <AppLayout><LandingPage /></AppLayout>} />
      <Route path="/story" component={() => <AppLayout><StoryPage /></AppLayout>} />
      <Route path="/docs" component={() => <AppLayout><DocsPage /></AppLayout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ReadingModeProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </ReadingModeProvider>
  );
}

export default App;
