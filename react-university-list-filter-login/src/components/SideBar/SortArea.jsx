import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';

const SortArea = () => {
  const [params, setParams] = useSearchParams();

  const options = [
    {
      label: 'Lowest Price',
      value: 'p_asc',
    },
    {
      label: 'Highest Price',
      value: 'p_desc',
    },
    {
      label: 'Deadline',
      value: 'deadline',
    },
  ];

  const handleSelect = (i) => {
    const sort =
      i.value === 'p_asc' ? 'cost' : i.value === 'p_desc' ? 'cost' : 'deadline';

    const order =
      i.value === 'p_asc' ? 'asc' : i.value === 'p_desc' ? 'desc' : 'asc';

    params.set('_sort', sort);
    params.set('_order', order);
    setParams(params);
  };

  return (
    <div>
      <label className="mt-2 block text-sm font-medium leading-6 text-gray-900">
        Sort
      </label>

      <Select options={options} onChange={handleSelect} />
    </div>
  );
};

export default SortArea;
