import React from 'react';
import Universities from '../components/Universities';
import SideBar from '../components/SideBar';

const MainPage = () => {
  return (
    <>
      <div className="container my-10 flex gap-10 max-sm:block sm:mx-0 md:mx-10">
        <div>
          <SideBar />
        </div>
        <div className="flex-1">
          <Universities />
        </div>
      </div>
    </>
  );
};

export default MainPage;
