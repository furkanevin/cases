import { getByCategory } from '@/app/utils/api';
import List from './List';

const Category = async ({ params }) => {
  const products = await getByCategory(params.id);

  return (
    <div className="category-page">
      <div className="container">
        <List products={products} />
      </div>
    </div>
  );
};

export default Category;
