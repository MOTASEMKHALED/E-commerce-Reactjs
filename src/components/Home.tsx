import React from "react";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar" >
        <ul className="sidebar-nav">
    
          <li className="sidebar-item">
            <NavLink to="/add-product" className="sidebar-link" >Add Products</NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/view-products" className="sidebar-link" >View Product</NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/UpdateProduct" className="sidebar-link" >Update Product</NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/ChatApp" className="sidebar-link" >Message</NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/LoginForm" className="sidebar-link">Exit</NavLink>
          </li>
        </ul>
      </nav>
      <div className="main-content">
         
      </div>
    </div>
  );
};

export default Home;
