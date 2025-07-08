const InfoField = ({ field }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="text-sm font-semibold text-gray-600 mb-2">
        {field.label}
      </div>
      <div className="text-lg font-bold text-gray-800">{field.value}</div>
    </div>
  );
};

export default InfoField;
