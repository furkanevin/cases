import "./component2.scss";

const Component2 = () => {
  return (
    <div className="comp comp-2">
      <h3>
        <img width={20} height={20} src="/heart.svg" />
        <span>Activities on your area</span>
      </h3>

      <div className="images">
        <img src="/img1.png" />
        <img src="/img2.png" />
        <img src="/img3.png" />
        <img src="/img4.png" />
      </div>
    </div>
  );
};

export default Component2;
