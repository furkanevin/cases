"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-red-100 p-6 mb-6">
            <FiAlertCircle className="h-12 w-12 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Something went wrong!
          </h1>

          <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            We encountered an error while loading this page. Please try again
            later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-medium rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
