import millify from 'millify';
import Image from 'next/image';
import React from 'react';

const TableRow = ({ item }) => {
  const isHigh = item.changePercent24Hr >= 0;

  return (
    <tr className="hover:shadow-lg rounded cursor-pointer">
      <td className="flex gap-2">
        <Image
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
          src="https://picsum.photos/50"
          alt="logo"
        />
        <div className="flex flex-col">
          <span className="font-bold">{item.symbol}</span>
          <span className="text-gray-500">{item.name}</span>
        </div>
      </td>

      <td>${millify(item.priceUsd)}</td>

      <td className="max-xl:hidden">{millify(item.volumeUsd24Hr)}</td>

      <td className={`${isHigh ? 'text-green-500' : 'text-red-500'} `}>
        <div className="flex flex-col">
          {isHigh && '+'}
          {Number(item.changePercent24Hr).toFixed(2)}%
          <span className="max-md:hidden xl:hidden text-black">
            {millify(item.volumeUsd24Hr)}
          </span>
        </div>
      </td>
      <td className="max-md:hidden flex justify-end ">
        <button className="text-dblue font-[500] bg-blue-100 py-1 px-2 rounded hover:bg-dblue hover:text-white transition">
          Trade
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
