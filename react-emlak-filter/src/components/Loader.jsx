const Loader = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return arr.map(() => (
    <div
      role="status"
      className="p-10 border  rounded shadow animate-pulse  border-gray-700"
    >
      <div className="h-2.5 rounded-full bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
      <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
      <div className="h-2 rounded-full bg-gray-700"></div>
    </div>
  ));
};

export default Loader;
