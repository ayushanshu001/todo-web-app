"use client";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode === null) return;
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  if (darkMode === null) return null;

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-700 text-white rounded">
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
