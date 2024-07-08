import React from 'react';
import { Link } from 'react-router-dom';

const UniversityCard = ({ university }) => {
  const { name, image, country, language, deadline } = university;

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl w-96 mx-auto mb-4 border-2 border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <img src={image} alt={name} className="w-24 h-24" />

        <Link
          to={`/main/${university.id}`}
          className="bg-cyan-900 hover:bg-cyan-600 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Detail {'>'}
        </Link>
      </div>
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2 line-clamp-1">{name}</h2>
        <p>
          <span className="font-semibold">Country:</span> {country}
        </p>
        <p>
          <span className="font-semibold">Language:</span> {language}
        </p>
        <p>
          <span className="font-semibold">Deadline:</span> {deadline}
        </p>
      </div>
    </div>
  );
};

export default UniversityCard;
