import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NewsDetail from './components/NewsDetail/NewsDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsDetail/:id" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
