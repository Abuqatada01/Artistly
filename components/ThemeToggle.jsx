import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded shadow-md"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
