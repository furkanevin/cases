import { useContext, useEffect, useState } from 'react';
import { getUniqueCities, getUniqueDistricts } from './../../utils/getUnique';
import { ApiContext } from '../../context/apiContext';
import { useSearchParams } from 'react-router-dom';

const TabTwo = () => {
  const [params] = useSearchParams();
  const city = params.get('il') || '';
  const district = params.get('ilçe') || '';

  const [selectedCity, setSelectedCity] = useState(city);
  const [districts, setDistricts] = useState([]);
  const { locations } = useContext(ApiContext);

  useEffect(() => {
    setDistricts(getUniqueDistricts(locations, selectedCity));
  }, [selectedCity]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <label
          htmlFor="cities"
          className="block mb-2 text-sm font-medium  text-white"
        >
          İstediğiniz Şehirdeki İlanları Arayın
        </label>
        <select
          defaultValue={city}
          onChange={(e) => setSelectedCity(e.target.value)}
          id="cities"
          name="city"
          className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={''} disabled>
            Şehir Seçiniz
          </option>
          {getUniqueCities(locations).map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="districts"
          className="block mb-2 text-sm font-medium  text-white"
        >
          İstediğiniz İlçedeki İlanları Arayın
        </label>
        <select
          defaultValue={''}
          id="districts"
          name="district"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={''} disabled>
            İlçe Seçiniz
          </option>
          {districts.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TabTwo;
