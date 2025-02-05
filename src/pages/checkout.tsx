import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/Checkout.css';

interface Product {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const { cartItems, totals } = location.state as {
    cartItems: { product: Product; quantity: number }[];
    totals: { subtotal: number };
  };

  return (
    <div className="mainscreen">
      <div className="paymentcard">
        <div className="rightside">
          <div className="form-section">
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>3D Ödeme</h1>
              <h2>Ödeme Bilgileri</h2>
              <p>Kartın Üzerindeki İsim</p>
              <input type="text" className="inputbox" name="name" required />
              <p>Kart Numarası</p>
              <input type="number" className="inputbox" name="card_number" id="card_number" required />
              <p>Kart Türü</p>
              <select className="inputbox" name="card_type" id="card_type" required>
                <option value="">Kart Türünü Seçiniz</option>
                <option value="Visa">Visa</option>
                <option value="Troy">Troy</option>
                <option value="MasterCard">MasterCard</option>
              </select>
              <div className="expcvv">
                <p className="expcvv_text">Tarih</p>
                <input type="month" className="inputbox" name="exp_date" id="exp_date" required />
                <p className="expcvv_text2">CVV</p>
                <input type="password" className="inputbox" name="cvv" id="cvv" required />
              </div>
              <button type="submit" className="button">Ödeme Yap</button>
            </form>
          </div>
          <div className="cart-details">
            <h2>Sepet Detayları</h2>
            <div className="cart-summary">
              {cartItems.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <div className="cart-item-details">
                    <div className="cart-item-title">{product.title}</div>
                    <div className="cart-item-quantity">Adet: {quantity}</div>
                    <div className="cart-item-price">Fiyat: {(product.price * quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <strong>Toplam: {totals.subtotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
