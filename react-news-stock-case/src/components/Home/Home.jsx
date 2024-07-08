import React, { useState } from 'react';
import News from '../News/News';
import Stocks from '../Stocks/Stocks';
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [activeItem, setActiveItem] = useState(false);

  const navigate = useNavigate();

  const navItems = ['Home', 'Economy', 'Technology', 'Blockchain'];

  return (
    <div>
      <h1 className="mt-4">
        Capital<span>Current</span>
      </h1>
      <ul
        className="d-flex list-unstyled gap-md-3 gap-sm-1 fs-6 justify-content-center align-items-center mt-4"
        role="button"
      >
        {navItems.map((item, i) => (
          <li
            key={i}
            className={activeItem === item ? 'active' : ''}
            onClick={() => {
              setActiveItem(item);
              navigate('/');
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="home">
        <main>
          <News />
        </main>
        <aside>
          <Stocks />
        </aside>
      </div>
    </div>
  );
};

export default Home;
