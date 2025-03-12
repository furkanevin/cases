import React from "react";

const DetailLoading: React.FC = () => {
  return (
    <div className="flex flex-col mx-6 animate-pulse">
      {/* Üst Alan Placeholder */}
      <div className="relative w-full h-60 md:h-80 bg-gray-300 rounded">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded">
          <span className="  bg-gray-400 h-8 w-48 rounded"></span>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-400 h-6 w-32 rounded"></div>
      </div>

      {/* İçerik Placeholder */}
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Sol Taraf Placeholder */}
        <div>
          <div className="h-6 bg-gray-400 w-40 rounded mb-4"></div>
          <div className="flex flex-wrap gap-4 mt-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 p-4 rounded w-24 h-12"
              ></div>
            ))}
          </div>

          <div className="h-6 bg-gray-400 w-40 rounded mt-6"></div>
          <div className="flex flex-wrap gap-4 mt-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 p-2 rounded w-24 h-8"
              ></div>
            ))}
          </div>

          <div className="h-6 bg-gray-400 w-40 rounded mt-6"></div>
          <div className="flex flex-wrap gap-4 mt-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 p-2 rounded w-24 h-8"
              ></div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf Placeholder */}
        <div>
          <div className="h-6 bg-gray-400 w-full rounded mb-4"></div>
          <div className="h-6 bg-gray-400 w-3/4 rounded mb-4"></div>
          <div className="h-6 bg-gray-400 w-1/2 rounded mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailLoading;
