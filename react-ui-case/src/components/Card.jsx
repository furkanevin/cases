const Card = ({ product, isPointMode }) => {
  return (
    <div className="border p-2 rounded flex flex-col gap-3">
      <img
        className="rounded w-full object-contain"
        src={product.image}
        alt={product.name}
      />

      <h4 className="font-bold text-xl line-clamp-1">{product.name}</h4>
      <p>{product.spec}</p>

      {isPointMode ? (
        <div className="flex justify-between">
          <p className="font-bold">{product.point} Bek Puan</p>
          <div className="border rounded-full py-1 px-6 flex gap-5">
            <button>-</button>
            <button>0</button>
            <button>+</button>
          </div>
        </div>
      ) : (
        <p className="font-bold">
          Çeklişe verilen ürün sayısı: {product.amount} adet
        </p>
      )}
    </div>
  );
};

export default Card;
