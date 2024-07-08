import React from 'react';
import { Link } from 'react-router-dom';
import { FaVirus } from 'react-icons/fa';
import { BiInjection } from 'react-icons/bi';
import SearchBox from './SearchBox';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white shadow-md">
      <div className="flex items-center ml-5">
        <Link
          to="/"
          className="flex items-center text-xl max-md:text-sm font-bold"
        >
          <FaVirus className="mr-2" /> COVID Tracker
        </Link>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <SearchBox />
      </div>
      <div className="flex items-center mr-5 max-md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span>Vaccinated Today</span>
            <span className="text-xs text-gray-400">(123,456)</span>
          </div>
          <BiInjection className="text-xl text-green-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
