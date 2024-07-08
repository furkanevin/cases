import "./component3.scss";
import data from "../../db.json";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";

const Component3 = () => {
  const [week, setWeek] = useState(1);

  const prevArr = Object.entries(data.weeklyWeather.previous);
  const currentArr = Object.entries(data.weeklyWeather.current);
  const nextArr = Object.entries(data.weeklyWeather.next);

  const weather = [prevArr, currentArr, nextArr];

  const images = {
    thunder: "/w5.png",
    rainy: "/w3.png",
    sunny: "/w1.png",
    "sunny cloudy": "/w2.png",
    "sunny rainy": "/w4.png",
  };

  return (
    <div className="comp comp-3">
      <button disabled={week === 0} onClick={() => setWeek(week - 1)}>
        {"<"}
      </button>

      {weather[week].map((i, key) => (
        <div key={Math.random()} className="card">
          <span>{i[0]}</span>
          <img src={images[i[1].type]} />
          <span>{i[1].degree}</span>
        </div>
      ))}

      <button disabled={week === 2} onClick={() => setWeek(week + 1)}>
        {">"}
      </button>
    </div>
  );
};

export default Component3;
