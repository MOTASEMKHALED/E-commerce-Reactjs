import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ProductDetalist.css';

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  description: string;
  imageUrl: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8080/products/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
  
    const cartItem = {
      id: product.id,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: quantity
    };
  
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  
    navigate('/ShoppingCart');
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section>
      <div className="container flex">
        <div className="left">
          <div className="main_image">
            <img src={product?.imageUrl} alt={product?.productName} />
          </div>
        </div>
        <div className="rightPro">
          <h3>{product?.productName}</h3>
          <h4>{product?.productPrice.toFixed(2)}<small> TL</small></h4>
          <p>{product?.description}</p>

          <h5>Adet</h5>
          <div className="add flex1">
            <span onClick={decrementQuantity}>-</span>
            <label>{quantity}</label>
            <span onClick={incrementQuantity}>+</span>
          </div>
          <button onClick={addToCart}>sepete ekle</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
