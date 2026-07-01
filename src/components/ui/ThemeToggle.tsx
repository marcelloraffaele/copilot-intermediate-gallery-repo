"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme();

    applyTheme(initialTheme);
    setTheme(initialTheme);
    setAnnouncement(`${initialTheme} mode enabled`);
  }, []);

  const handleToggle = () => {
    const isCurrentThemeDark =
      theme === "dark" ||
      (theme === null && document.documentElement.classList.contains("dark"));
    const nextTheme = isCurrentThemeDark ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    setAnnouncement(`${nextTheme} mode enabled`);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
    </button>
  );
}
