"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
        Login
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-400 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-400 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded dark:bg-blue-400 dark:text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
}
