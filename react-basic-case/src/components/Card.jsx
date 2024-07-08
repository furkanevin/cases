const Card = ({ item }) => {
  return (
    <div className="card">
      <h3>{item.sport.sportName}</h3>
      <p>EventId: {item.sport.eventId}</p>
      <p>MarketId: {item.market.marketId}</p>
    </div>
  );
};

export default Card;
