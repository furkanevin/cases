import { useState } from 'react';
import { useData } from '../../context/UniversityContext';
import SelectFilter from './SelectFilter';
import { useSearchParams } from 'react-router-dom';
import CostFilter from './CostFilter';
import SortArea from './SortArea';

const SideBar = () => {
  const [params, setParams] = useSearchParams();
  const [selectedCost, setSelectedCost] = useState(1);

  return (
    <div className="mb-5 flex justify-center">
      <div className="mt-5">
        <h4 className="font-semibold text-center text-gray-900">Filtres</h4>
        <button
          onClick={() => setParams({})}
          className="block w-80 rounded-md bg-red-800 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-red-600 focus-visible:outline-red-800"
        >
          Clear Filters
        </button>

        <hr className="my-4 block w-80 border-2 bg-black-900" />
        <div className="flex flex-col gap-4">
          <SelectFilter label={'Select a university'} field={'name'} />

          <SelectFilter label={'Select a country'} field={'country'} />

          <SelectFilter label={'Select a duration'} field={'duration'} />

          <SelectFilter label={'Select a language'} field={'language'} />

          <CostFilter />

          <SortArea />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
