import { getById } from '@/app/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';
import AddButton from '../addButton';

const ProductDetail = async ({ params }) => {
  const product = await getById(params.id);

  return (
    <div className="detail-page">
      <div className="container">
        <button>
          <Link href={'/'} className="return-btn">
            <GoArrowLeft />
          </Link>
        </button>

        <div className="wrapper">
          <div className="left">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={500}
            />
          </div>

          <div className="right">
            <h1>{product.title}</h1>
            <b>${product.price}</b>
            <p>Description / Details</p>
            <p>{product.description}</p>
            <AddButton product={product} />
            <p>Free shipping to TR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
