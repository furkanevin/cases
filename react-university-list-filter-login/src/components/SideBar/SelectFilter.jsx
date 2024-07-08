import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import removeDuplicates from '../../utils/removeDuplicates';
import { useData } from '../../context/UniversityContext';

const SelectFilter = ({ label, field }) => {
  const { universities } = useData();
  const [params, setParams] = useSearchParams();
  const defaultValue = params.get(field);
  const options = removeDuplicates(universities, field);

  return (
    <div>
      <label className="mt-2 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>

      <Select
        className="z-50"
        defaultValue={{
          label: defaultValue,
          value: defaultValue,
        }}
        onChange={(selected) => {
          params.set(field, selected.value);
          params.set('_page', 1);
          setParams(params);
        }}
        options={options}
      />
    </div>
  );
};

export default SelectFilter;
