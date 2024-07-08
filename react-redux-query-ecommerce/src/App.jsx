import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
