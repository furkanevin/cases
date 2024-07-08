'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductSlider = ({ products }) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start' });

  return (
    <div className="embla2" ref={emblaRef}>
      <div className="embla2__container">
        {products.map((product, index) => (
          <Link
            href={`/product/${product.id}`}
            className="embla2__slide card"
            key={index}
          >
            <Image
              src={product.image}
              width={150}
              height={200}
              alt={product.title}
            />

            <h2>
              {product.title.length > 40
                ? product.title.slice(0, 40) + '...'
                : product.title}
            </h2>

            <p className="price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
