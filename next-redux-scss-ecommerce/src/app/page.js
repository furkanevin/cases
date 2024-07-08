import ProductList from './(components)/ProductList';
import Slider from './(components)/Slider';

export default function Home() {
  return (
    <main className="main-page">
      <Slider />

      <div className="container">
        <ProductList category={'electronics'} />
        <ProductList category={'jewelery'} />
      </div>
    </main>
  );
}
