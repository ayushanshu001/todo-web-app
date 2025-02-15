"use client";

import KanbanBoard from "@/components/KanbanBoard";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading")
    return <p className="text-center text-lg">Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 dark:bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>

        {/* Kanban Board */}
        <div className="mt-6">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
