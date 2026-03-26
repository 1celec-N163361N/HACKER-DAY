import { createContext, useContext, useState, type ReactNode } from "react";

const ReadingModeContext = createContext({ active: false, toggle: () => {} });

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <ReadingModeContext.Provider value={{ active, toggle: () => setActive(v => !v) }}>
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  return useContext(ReadingModeContext);
}
