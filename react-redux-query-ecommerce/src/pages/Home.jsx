import { Col, Row } from 'react-bootstrap';
import { useGetProductsQuery } from '../redux/query/productsApi';
import ProductCard from './../components/ProductCard';

const Home = () => {
  const { data, isError, isLoading } = useGetProductsQuery();

  return (
    <div className="home-container">
      <h2>Yeni Eklenenler</h2>
      <Row xs={1} sm={2} md={3} lg={3} xl={4} xxl={5} className="g-4">
        {isLoading ? (
          <p>Yükleniyor...</p>
        ) : isError ? (
          <p>Üzgünüz :( Beklenemdik bir hata oluştu</p>
        ) : (
          data.map((product) => (
            <Col>
              <ProductCard key={product.id} product={product} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Home;
