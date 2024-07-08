import { useContext } from 'react';
import { ApiContext } from '../context/apiContext';
import Item from './Item';
import Loader from './Loader';
import Error from './Error';

const Content = () => {
  const { filtred, data, error, isLoading } = useContext(ApiContext);

  return (
    <div className="col-span-8 max-md:col-span-12 overflow-hidden">
      <div className="flex flex-col gap-20 h-full">
        <div className="border p-5 rounded-sm text-center text-lg font-bold">
          {!data ? '...' : data.length} Adet Veriden Hesaplanmıştır
        </div>

        <div className="border rounded-sm p-5 h-full overflow-auto">
          <h4 className="text-center text-lg font-semibold">İçerik</h4>

          <div className="flex flex-col gap-10 mt-5">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Error error={error.message} />
            ) : filtred.length > 0 ? (
              filtred.slice(0, 10).map((ad, i) => <Item key={i} ad={ad} />)
            ) : (
              <Error error={'Aranan Kriterlere Uygun Veri Bulunamadı'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
