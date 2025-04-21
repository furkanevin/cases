"use client";

import { useEffect } from "react";
import BackButton from "@/components/ui/BackButton";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Recipe detail page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center py-16 px-4">
          <div className="inline-flex rounded-full bg-red-100 p-6 mb-6">
            <FiAlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Error loading recipe
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            There was a problem fetching this recipe. This might be due to API
            limits, network issues, or an invalid API key.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiRefreshCw className="mr-2 h-5 w-5" />
              Try again
            </button>

            <BackButton href=".." variant="secondary" />
          </div>
        </div>
      </div>
    </main>
  );
}
