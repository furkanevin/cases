import React from 'react';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ maxWidth: '18rem' }}>
      <Card.Img
        height={200}
        className="object-fit-contain"
        variant="top"
        src={product.image}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-truncate">
            {product.title}
          </Card.Title>
          <Card.Text>
            <p>${product.description.slice(0, 70) + '...'}</p>
            <p className="text-success fw-bold">${product.price}</p>
          </Card.Text>
        </div>

        <Button
          onClick={() => dispatch(addToCart(product))}
          variant="primary"
        >
          Sepete Ekle
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
