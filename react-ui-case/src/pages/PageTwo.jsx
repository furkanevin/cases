import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { products } from '../constants';
import Card from './../components/Card';

const PageTwo = () => {
  return (
    <div className="max-w-[1440px] mx-auto lg:py-20 p-10">
      <Header />

      <div className="flex justify-between my-10 border-b pb-5">
        <BackButton />

        <h5 className="font-semibold text-gray-500">Sponsorlar Ürün Listesi</h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product, i) => (
          <div className="col">
            <Card product={product} key={i} />
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-200 p-5 rounded flex flex-col items-center">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio sit
          unde tempora reprehenderit, praesentium rerum modi animi quia magni ad
          alias! Tenetur libero vero consectetur! Blanditiis quasi facere totam
          in asperiores, natus iusto laudantium ipsam a corrupti error
          consequatur eveniet voluptatum sed quaerat nostrum. Dolorum commodi
          velit eum dignissimos error?
        </p>
        <a className="text-blue-500 cursor-pointer" href="#">
          Burda bir bağlantı bulunuyor
        </a>
      </div>
    </div>
  );
};

export default PageTwo;
