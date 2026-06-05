"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, THEME_STORAGE_KEY, Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  const isDark = theme === "dark";
  const buttonLabel = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";
  const buttonText = mounted ? (isDark ? "Light" : "Dark") : "Theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-secondary inline-flex items-center gap-2"
      aria-label={buttonLabel}
      aria-pressed={mounted ? isDark : undefined}
      disabled={!mounted}
    >
      {mounted ? (isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : null}
      <span className="hidden sm:inline">{buttonText}</span>
    </button>
  );
}
