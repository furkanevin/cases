const Loader = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {array.map(() => (
        <div
          data-testid="loader"
          className="bg-gray-200 p-4 rounded-lg shadow-md animate-pulse"
        >
          <div className="bg-gray-700 mb-10 w-3/4 h-1"></div>
          <div className="bg-gray-700 mb-2 w-1/2 h-1"></div>
        </div>
      ))}
    </>
  );
};

export default Loader;
