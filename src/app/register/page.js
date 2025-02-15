"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "User already exists");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Register</h1>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleRegister} 
        className="flex flex-col space-y-4 w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-lg">
        
        <input
          type="text"
          placeholder="Name"
          className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          type="submit"
          className="bg-green-600 text-white p-3 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 dark:text-black font-bold transition-all">
          Register
        </button>
      </form>
    </div>
  );
}
