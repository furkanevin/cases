import { useState } from 'react';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import { useSearchParams } from 'react-router-dom';

const Filter = () => {
  const [isTabOne, setIsTabOne] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.type) {
      searchParams.set('tip', data.type);
    }

    if (data.city) {
      searchParams.set('il', data.city);
    }

    if (data.district) {
      searchParams.set('ilçe', data.district);
    }

    setSearchParams(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-4 max-md:col-span-12 p-5 border rounded-sm flex flex-col justify-between"
    >
      <div className="flex justify-center gap-6">
        <button
          className={`py-2 px-6 border rounded transition hover:bg-gray-500 ${
            isTabOne ? 'bg-yellow-500' : ''
          }`}
          onClick={() => setIsTabOne(true)}
        >
          Tab 1
        </button>
        <button
          className={`py-2 px-6 border rounded transition hover:bg-gray-500  ${
            !isTabOne ? 'bg-yellow-500' : ''
          }`}
          onClick={() => setIsTabOne(false)}
        >
          Tab 2
        </button>
      </div>

      {isTabOne ? <TabOne /> : <TabTwo />}

      <button className="bg-red-500 py-2 px-10 rounded-lg  mx-auto transition hover:bg-red-600">
        Sorgula
      </button>
    </form>
  );
};

export default Filter;
