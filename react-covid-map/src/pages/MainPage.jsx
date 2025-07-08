import React from 'react';
import { useNavigate } from 'react-router-dom';
import World from '@react-map/world';
import { CovidInfo } from '../components/CovidInfo';

const MainPage = () => {
  const navigate = useNavigate();

  const handleSelect = (country) => {
    navigate(`/detail?country=${country}`);
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col relative p-4">
      <div className="flex-grow flex items-center justify-center z-10 max-lg:ps-[20%]  lg:ps-0">
        <div className="w-full h-full pb-10 max-sm:scale-[1.5] max-lg:scale-[1.3] ">
          <World onSelect={handleSelect} size={'100vw'} hoverColor="#4C1D95" />
        </div>
      </div>
      <CovidInfo />
    </div>
  );
};

export default MainPage;
