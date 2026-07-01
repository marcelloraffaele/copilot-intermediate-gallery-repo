export const THEME_STORAGE_KEY = "theme";

export function getThemeInitializationScript() {
  return `
    (function () {
      try {
        var storedTheme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
        var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        var theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme;
        document.documentElement.classList.toggle("dark", theme === "dark");
      } catch {}
    })();
  `;
}
