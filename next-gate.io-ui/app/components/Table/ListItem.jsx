import millify from 'millify';
import Image from 'next/image';

const ListItem = ({ item }) => {
  const isHigh = item.changePercent24Hr >= 0;

  return (
    <div className="py-4 px-3 flex justify-between hover:shadow rounded cursor-pointer">
      <div className="flex  items-center gap-2">
        <Image
          width={32}
          height={32}
          src="https://picsum.photos/51"
          alt="logo"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-bold">{item.symbol}</p>
          <p className="line-clamp-1">{item.name}</p>
        </div>
      </div>

      <p className="text-sm max-xl:hidden">${millify(item.priceUsd)}</p>

      <div className={`${isHigh ? 'text-green-500' : 'text-red-500'} `}>
        <p className="text-sm xl:hidden text-black">
          ${millify(item.priceUsd)}
        </p>
        <span>
          {isHigh && '+'}
          {Number(item.changePercent24Hr).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default ListItem;
