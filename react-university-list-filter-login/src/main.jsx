import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UniversityProvider } from './context/UniversityContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UniversityProvider>
        <App />
      </UniversityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
