import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useSearchParams } from 'react-router-dom';

const CostFilter = () => {
  const [params, setParams] = useSearchParams();
  const gte = params.get('cost_gte') || 0;
  const lte = params.get('cost_lte') || 50000;
  const [range, setRange] = useState([gte, lte]);

  const handleSearch = () => {
    params.set('cost_gte', range[0]);
    params.set('cost_lte', range[1]);
    params.set('_page', 1);
    setParams(params);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
        Select a cost
      </label>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <RangeSlider
            defaultValue={[gte, lte]}
            min={0}
            max={50000}
            onInput={(e) => setRange(e)}
          />

          <div className="mt-2 flex justify-between font-semibold">
            <span>{range[0]}</span>
            <span>{range[1]}</span>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="border p-1 rounded-md text-sm hover:bg-gray-100"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CostFilter;
