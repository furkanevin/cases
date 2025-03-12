import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                  MovieGuide
                </Link>
                <div className="space-x-6">
                  <Link to="/" className="text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
                    Favorites
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
