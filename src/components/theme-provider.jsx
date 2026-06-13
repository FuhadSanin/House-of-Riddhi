import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "house-of-riddhi-theme";

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyDomTheme(theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system" ? getSystemTheme() : theme;
  root.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = STORAGE_KEY,
}) {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(storageKey) ?? defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const resolvedTheme = useMemo(() => {
    if (typeof window === "undefined") return "light";
    if (theme === "system") return getSystemTheme();
    return theme;
  }, [theme]);

  useEffect(() => {
    applyDomTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyDomTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback(
    (value) => {
      try {
        localStorage.setItem(storageKey, value);
      } catch {
        /* ignore */
      }
      setThemeState(value);
    },
    [storageKey]
  );

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
