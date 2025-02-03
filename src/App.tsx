import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ViewProducts from './components/ViewProducts';
import Home from './components/Home';
import Header from './components/Header';
import LoginForm from './components/Login';
import Products from './components/Products';
import ProductDetail from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import ChatApp from './components/Message';
import Checkout from './components/checkout';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-products" element={<ViewProducts onDeleteProduct={(productId: string): void => {}} />} />
            <Route path='/UpdateProduct' element={<UpdateProduct onDeleteProduct={function (productId: string): void {
              throw new Error('Function not implemented.');
            } }/>}/>
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/ChatApp" element={<ChatApp />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
