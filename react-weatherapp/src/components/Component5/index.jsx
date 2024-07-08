import "./component5.scss";
import data from "../../db.json";

const Component5 = () => {
  const forecast = Object.entries(data.forecast);

  return (
    <div className="comp comp-5">
      <h2>Hourly Forecast</h2>

      <div className="horizontal timeline">
        <div className="steps">
          {forecast.map((item) => (
            <div className="step">
              <span className="degree">{item[1]}°</span>
              <p className="time">{item[0]}</p>
            </div>
          ))}
        </div>

        <div className="line"></div>
      </div>
    </div>
  );
};

export default Component5;
