'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const List = ({ products }) => {
  const [limit, setLimit] = useState(3);

  return (
    <>
      <div className="cards-wrapper">
        {products.slice(0, limit).map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="card"
          >
            <Image src={product.image} width={200} height={300} />
            <h3>{product.title}</h3>
            <b>${product.price}</b>
          </Link>
        ))}
      </div>

      {limit < 6 && (
        <div className="load-more">
          <button onClick={() => setLimit(limit + 3)}>LOAD MORE</button>
        </div>
      )}
    </>
  );
};

export default List;
