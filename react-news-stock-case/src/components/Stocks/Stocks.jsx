import React, { useEffect, useState } from "react";
import "./Stocks.css";

const Stocks = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3050/matches`)
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchList(search);

    e.target.reset();
  };

  return (
    <div className="p-2">
      <h1>Stock Market</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex gap-3 mb-2 justify-content-center"
      >
        <input
          className="rounded border-none bg-secondary-subtle "
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-dark" type="submit">
          Search
        </button>
      </form>
      <table className="table table-striped table-dark table-responsive">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th scope="col">Symbol</th>
            <th scope="col">Type</th>
            <th scope="col">Currency</th>
            <th scope="col">Match Score</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin, i) => (
            <>
              <tr key={i}>
                <th></th>
                <td>{coin["1. symbol"]}</td>
                <td>{coin["3. type"]}</td>
                <td>{coin["8. currency"]}</td>
                <td>{coin["9. matchScore"]}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
