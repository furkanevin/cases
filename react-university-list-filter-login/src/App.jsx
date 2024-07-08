import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NoteFoundPage';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
