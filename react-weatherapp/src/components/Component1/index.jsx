import "./component1.scss";

const Component1 = () => {
  return (
    <div className="comp comp-1">
      <img src="/header-logo.png" />
      <img src={"/weather-2.svg"} />

      <div>
        <img src={"/location.svg"} />
        <span>weather</span>
      </div>

      <div>
        <img src={"/settings.svg"} />
        <span>cities</span>
      </div>

      <div>
        <img src={"/compass.svg"} />
        <span>settings</span>
      </div>
    </div>
  );
};

export default Component1;
