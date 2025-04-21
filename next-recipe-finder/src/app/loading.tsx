export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-60 right-40 w-20 h-20 bg-red-300 rounded-full opacity-20 blur-xl"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="h-12 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 mx-auto"></div>
          <div className="h-5 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
        </div>
        
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-pulse">
          <div className="mb-6">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <div className="mb-8">
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        <div className="mt-8 h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </main>
  );
} 