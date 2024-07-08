import axios from 'axios';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import { ReactComponent as Melon } from './assets/melon.svg';
import loading from './assets/loading-melon.gif';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('testData.json').then((res) => {
      // refine and transform the data
      const refinedData = res.data.map((item) => ({
        sport: {
          ...item.testData[0].sport,
          sportName: item.testData[0].sport.sportName.toLowerCase(),
        },
        market: { ...item.testData[0].market },
      }));

      // sort by market id desc.
      refinedData.sort(
        (a, b) =>
          Number(b.market.marketId) - Number(a.market.marketId)
      );

      setData(refinedData);
    });
  }, []);

  return (
    <>
      <header>
        <Melon />
      </header>

      <div className="container">
        <nav></nav>

        <main>
          {!data ? (
            <img className="loading" src={loading}></img>
          ) : (
            data.map((item, i) => <Card key={i} item={item} />)
          )}
        </main>
      </div>
    </>
  );
}

export default App;
