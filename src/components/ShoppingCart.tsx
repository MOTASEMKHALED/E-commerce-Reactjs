import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ShoppingCard.css';

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  description: string;
  imageUrl: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const validCartItems = cartFromStorage.filter((item: any) => item && item.product && item.product.productPrice);
    setCartItems(validCartItems);
  }, []);

  const recalculateCart = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.productPrice * item.quantity, 0);
    return { subtotal };
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const removeItem = (productId: string) => {
    const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, totals: recalculateCart() } });
  };

  const totals = recalculateCart();

  return (
    <>
      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
        </div>

        {cartItems.map(({ product, quantity }) => (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.imageUrl} alt={product.productName} />
            </div>
            <div className="product-details">
              <div className="product-title">{product.productName}</div>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-price">{product.productPrice.toFixed(2)}</div>
            <div className="product-quantity">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
              />
            </div>
            <div className="product-removal">
              <button
                className="remove-product"
                onClick={() => removeItem(product.id)}
              >
                Remove
              </button>
            </div>
            <div className="product-line-price">{(product.productPrice * quantity).toFixed(2)}</div>
          </div>
        ))}

        <div className="totals">
          <div className="totals-item">
            <label>Total</label>
            <div className="totals-value" id="cart-subtotal">
              {totals.subtotal.toFixed(2)}
            </div>
          </div>
        </div>

        <button className="checkout" onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
};

export default ShoppingCart;
