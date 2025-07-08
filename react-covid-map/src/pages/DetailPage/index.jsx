import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import millify from 'millify';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import InfoField from '../../components/InfoField';

const DetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedCountry = new URLSearchParams(location.search).get('country');
  const { isLoading, error, data } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: 'DATA_FETCH_REQUESTED', payload: selectedCountry });
  }, [dispatch, selectedCountry]);

  const fieldArray = [
    { label: 'Active Cases', value: millify(data?.active) },
    { label: 'Cases Confirmed', value: millify(data?.confirmed) },
    { label: 'Deaths', value: millify(data?.deaths) },
    { label: 'Recovered', value: millify(data?.recovered) },
    { label: 'Fatality Rate', value: millify(data?.fatality_rate) },
    { label: 'Last Update', value: data?.last_update },
    { label: 'Country Name', value: data?.region.name },
    { label: 'Country Code', value: data?.region.iso },
    { label: 'Country Latitude', value: data?.region.lat },
    { label: 'Country Longitude', value: data?.region.long },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-700">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800"
          >
            &lt; Back
          </Link>
          <div className="flex items-center space-x-2">
            {!isLoading && !error && (
              <>
                <img
                  src={data?.flagUrl}
                  alt="Country Flag"
                  className="w-12 h-12 rounded-full"
                />
                <h1 className="text-3xl font-bold text-gray-800">
                  {data?.region.name}
                </h1>
              </>
            )}
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading && <Loader />}

          {error && <Error error={error} />}

          {!isLoading &&
            !error &&
            fieldArray.map((field, index) => (
              <InfoField key={index} field={field} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
