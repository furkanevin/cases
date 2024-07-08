import "./component4.scss";

const Component4 = () => {
  return (
    <div className="comp comp-4">
      <div className="top">
        <h2>
          <img src="/clock.svg" />
          8:00PM GMT
        </h2>

        <h1>AIR CONDITIONS</h1>
      </div>

      <div className="info">
        <div className="item">
          <img src="/real.svg" />
          <div>
            <p>Real Feel</p>
            <p>4</p>
          </div>
        </div>
        <div className="item">
          <img src="/wind.svg" />
          <div>
            <p>Wind</p>
            <p>0.8 km/hr</p>
          </div>
        </div>
        <div className="item">
          <img src="/rain.svg" />
          <div>
            <p>Change of Rain</p>
            <p>2%</p>
          </div>
        </div>

        <div className="item">
          <img src="/w4.png" />
          <div>
            <p>UV Index</p>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component4;
