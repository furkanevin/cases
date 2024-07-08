import { CiSearch } from 'react-icons/ci';
import { tableButtons } from '../../constants/index.jsx';
import { GoArrowUpRight } from 'react-icons/go';
import TableRow from './TableRow';
import ListItem from './ListItem';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import Title from '../Title';

const Table = async () => {
  async function getData() {
    const res = await fetch('https:api.coincap.io/v2/assets?limit=6');

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  const res = await getData();

  return (
    <section className="max-w-7xl mx-auto px-[24px] mt-[80px]">
      <div className="flex justify-between max-md:flex-col">
        <Title> Crypto Market Today</Title>

        <div className="flex gap-3 items-center">
          <div className="group flex justify-end">
            <input
              placeholder="Search"
              className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-full transition-[width] duration-500 border border-dblue outline-none p-1 rounded max-md:!hidden"
            />
            <button className="group-hover:hidden py-1 px-2 bg-gray-300 text-2xl rounded-md max-md:!block">
              <CiSearch />
            </button>
          </div>
          <button className="py-1 px-2 bg-gray-300 rounded-md hover:text-dblue font-semibold">
            All Crypto Prices
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6 mt-[32px]">
        <div className="col-span-6 md:col-span-4 border rounded-lg overflow-hidden">
          <div className="flex gap-4 p-4 overflow-auto scroll">
            {tableButtons.map((item, i) => (
              <button
                key={i}
                className={`${
                  item.active &&
                  'border border-gray-300 rounded-md text-dblue bg-blue-100'
                } text-gray-600 flex font-bold py-2 px-4 hover:text-dblue`}
              >
                {item.name}
                {item.icon && <GoArrowUpRight className="text-2xl" />}
              </button>
            ))}
          </div>

          <table className="w-full mt-4">
            <thead className="!px-4">
              <tr>
                <th className="text-start text-sm text-gray-400 font-normal px-4">
                  Coin
                </th>
                <th className="text-start text-sm text-gray-400 font-normal">
                  Price
                </th>
                <th className="text-start text-sm text-gray-400 font-normal max-xl:hidden">
                  24h Trading Volume
                </th>
                <th className="text-start text-sm text-gray-400 font-normal">
                  24h Change
                </th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {res?.data?.map((item) => (
                <TableRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>

          <div className="flex justify-center gap-2 my-4">
            <button className="bg-gray-300 p-2 rounded-md hover:text-dblue">
              <SlArrowLeft />
            </button>
            <button className="bg-gray-300 p-2 rounded-md hover:text-dblue">
              <SlArrowRight />
            </button>
          </div>
        </div>

        <div className="col-span-2 border rounded-lg  max-md:hidden">
          <div className="p-4 flex">
            <button className="text-blue-500 bg-blue-100 font-bold border-gray-200 py-2 px-3 rounded">
              Most Popular
            </button>
            <button className="font-bold px-3">Top Gainer</button>
          </div>

          {res?.data?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}

          <div className="flex justify-center gap-2 my-4">
            <button className="bg-gray-300 p-2 rounded-md hover:text-dblue">
              <SlArrowLeft />
            </button>
            <button className="bg-gray-300 p-2 rounded-md hover:text-dblue">
              <SlArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
