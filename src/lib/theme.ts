export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "gallery-theme";

export function applyTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}
