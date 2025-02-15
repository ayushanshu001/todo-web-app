import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold">Welcome to the Todo App</h1>
      <Link href="/dashboard">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded dark:bg-blue-500 dark:text-black">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
