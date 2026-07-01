export const THEME_STORAGE_KEY = "theme";

export const themeInitializationScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
      var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme;
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {}
  })();
`;
