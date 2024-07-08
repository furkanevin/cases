const Error = ({ error }) => {
  return (
    <div className="text-center flex flex-col items-center gap-10 mt-10">
      <p className="bg-red-400 p-5 rounded ">{error}</p>
      <p>Lütfen Tekrar Deneyiniz</p>
    </div>
  );
};

export default Error;
