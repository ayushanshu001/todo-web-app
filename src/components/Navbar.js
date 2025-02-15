"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
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

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md dark:bg-gray-900 dark:shadow-lg text-black dark:text-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Todo App
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="p-2 bg-red-500 rounded dark:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link
              href="/register"
              className="p-2 bg-blue-500 text-white rounded dark:bg-blue-400 dark:text-black"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
