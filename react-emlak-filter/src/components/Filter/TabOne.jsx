import { useSearchParams } from 'react-router-dom';

const TabOne = () => {
  const [params] = useSearchParams();
  const type = params.get('tip');

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center px-10 border  rounded border-gray-700">
        <input
          defaultChecked={type === 'Satılık'}
          value="Satılık"
          id="sell"
          type="radio"
          name="type"
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 "
        />
        <label
          htmlFor="sell"
          className="w-full py-4 ms-2 text-sm font-medium  text-gray-300 cursor-pointer"
        >
          Satılık
        </label>
      </div>
      <div className="flex items-center px-10 border  rounded border-gray-700">
        <input
          defaultChecked={type === 'Kiralık'}
          value="Kiralık"
          id="rent"
          type="radio"
          name="type"
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
        />
        <label
          htmlFor="rent"
          className="w-full py-4 ms-2 text-sm font-medium  text-gray-300 cursor-pointer"
        >
          Kiralık
        </label>
      </div>
    </div>
  );
};

export default TabOne;
