import { getByCategory } from '../utils/api';
import ProductSlider from './ProductSlider';

const ProductList = async ({ category }) => {
  const data = await getByCategory(category, 12);

  return (
    <div className="product-list">
      <h1>{category}</h1>

      <ProductSlider products={data} />
    </div>
  );
};

export default ProductList;
