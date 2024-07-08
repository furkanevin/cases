import { createContext, useContext, useEffect, useState } from 'react';
import api from './../utils/api';
import { useSearchParams } from 'react-router-dom';

export const UniversityContext = createContext();

export const UniversityProvider = ({ children }) => {
  const [universities, setUniversities] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [maxCount, setMaxCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    api
      .get('/universities')
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const params = Object.fromEntries(searchParams.entries());
    params._limit = 9;

    api
      .get('/universities', { params })
      .then((response) => {
        setMaxCount(response.headers.get('X-Total-Count'));
        setFiltred(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  return (
    <UniversityContext.Provider
      value={{
        universities,
        filtred,
        selectedCategory,
        error,
        isLoading,
        maxCount,
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export const useData = () => useContext(UniversityContext);
