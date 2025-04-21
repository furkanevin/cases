export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
          
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-4"></div>
                  
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse mr-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 