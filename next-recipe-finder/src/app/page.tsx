import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-red-300 rounded-full opacity-20 blur-xl"></div>

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Recipe Finder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Find delicious recipes based on ingredients, cuisine, or preparation
            time
          </p>
        </div>

        <SearchForm />

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
          Find delicious recipes in seconds
        </div>
      </div>
    </main>
  );
}
