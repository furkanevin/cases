import BackButton from "@/components/ui/BackButton";
import { FiX } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-red-100 p-6 mb-6">
          <FiX className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Recipes Not Found
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          The recipes you're looking for don't exist or might have been removed.
        </p>
        <BackButton href="/" />
      </div>
    </div>
  );
}
