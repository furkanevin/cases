import Image from 'next/image';
import { IoMdTime } from 'react-icons/io';

const Card = ({ item, active }) => {
  return (
    <div
      style={{
        zIndex: active && 999,
        left: active && 0,
        rotate: active && '0deg',
      }}
      className="min-w-[300px] border border-zinc-700 w-fit  shadow-2xl shadow-[#00800023] rounded-md overflow-hidden bg-zinc-800"
    >
      <Image src={item.image} width={460} height={200} alt="donate" />
      <div className="bg-zinc-700 rounded-b-lg flex justify-center items-center gap-3 text-green-600">
        <IoMdTime />
        <p>{item.time}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4 mt-4">
          {item.categories.map((text, i) => (
            <p key={i} className="text-xs font-bold bg-blue-600 p-1 rounded">
              {text}
            </p>
          ))}
        </div>

        <h1 className="text-2xl font-bold">{item.title}</h1>

        <div className="bg-zinc-900 p-2 rounded-md">
          <div className="flex items-end gap-2">
            <h2 className="text-2xl">{item.supporter}</h2>
            <p className="text-gray-400">Supporters</p>
          </div>

          <div className="flex justify-between gap-3 my-3">
            <p>
              <span>{item.price_gained}</span>
              <span className="text-gray-400">/ {item.price_total} USDT</span>
            </p>
            <p className="text-dblue max-lg:hidden">
              {item.percentage}% raised
            </p>
          </div>

          <div className="h-2 bg-dblue w-full" />
          <p className="text-dblue lg:hidden">{item.percentage}% raised</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
