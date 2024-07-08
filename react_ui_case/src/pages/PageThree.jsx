import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { IoIosSearch } from 'react-icons/io';
import { products } from '../constants';
import Card from '../components/Card';
import { SlBasket } from 'react-icons/sl';

const PageThree = () => {
  return (
    <div className="max-w-[1440px] mx-auto lg:py-20 p-10">
      <Header />

      <div className="flex gap-5  my-10 border-b pb-5">
        <BackButton />

        <div className="flex justify-between items-center border rounded flex-1 px-4 gap-2">
          <input
            className="flex-1 outline-none"
            placeholder="aratılacak olan metni giriniz"
            type="text"
          />
          <IoIosSearch className="text-lg cursor-pointer hover:text-gray-500" />
        </div>
      </div>

      <div className="flex gap-2 max-md:flex-col-reverse">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-2 md:gap-6">
          {products.map((product, i) => (
            <Card product={product} key={i} isPointMode />
          ))}
        </div>

        <div className="min-w-[200px]">
          <div className="flex items-center">
            <p className="bg-blue-500 text-white p-2 font-semibold text-sm whitespace-nowrap rounded flex-1">
              BEK Puanınınız
            </p>

            <span className="border border-blue-500 rounded p-2 font-semibold">
              100
            </span>
          </div>

          <div className="border mt-8 mb-2 p-2">
            <div className="border-b flex justify-between pb-2">
              <h3>Sepetiniz</h3>
              <SlBasket />
            </div>

            <h2 className="font-semibold text-sm my-3">Toplam 0 BEK Puanı </h2>
            <p className="text-gray-400">Lorem, ipsum dolor.</p>
          </div>

          <button className="bg-orange-500 text-white w-full p-2 rounded hover:bg-orange-600">
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
