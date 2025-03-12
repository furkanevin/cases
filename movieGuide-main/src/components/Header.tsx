import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200">
            MovieGuide
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-200">
              Home
            </Link>
            <Link to="/top-rated" className="text-white hover:text-blue-200">
              Top Rated
            </Link>
            <Link to="/popular" className="text-white hover:text-blue-200">
              Popular
            </Link>
            <Link to="/trending" className="text-white hover:text-blue-200">
              Trending
            </Link>
            <Link to="/favorites" className="text-white hover:text-blue-200">
              Favorites
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
