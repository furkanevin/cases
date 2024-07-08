import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const loc = useLocation();
  console.log(loc);

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2">
        <img src="/public/images/logo.png" alt="" />
      </div>
      <div className="w-1/2">
        <p className="text-center">
          The page you are looking for cannot be found. <br />
          Return to
          <Link to={"/"} className="text-blue-500">
            LoginPage
          </Link>
          {loc.state && (
            <p className="bg-red-800 text-white rounded">{loc.state}</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
