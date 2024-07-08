import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageOne from './pages/pageOne';
import PageTwo from './pages/pageTwo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/page-two" element={<PageTwo />} />
    </Routes>
  );
};

export default App;
