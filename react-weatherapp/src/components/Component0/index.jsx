import "./component0.scss";
import data from "../../db.json";
import cloud from "/cloud.svg";

const Component0 = () => {
  return (
    <div className="comp-0">
      <div className="info">
        <div>
          <p>{data.city}</p>
          <p>{data.type}</p>
        </div>

        <h1>{data.degree} C</h1>
      </div>

      <img src={cloud} />

      <h2 className="date">{data.date}</h2>
    </div>
  );
};

export default Component0;
