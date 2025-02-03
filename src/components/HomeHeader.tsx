import React from "react";
import { Link } from "react-router-dom";


import '../CSS/App.css';

const HomeHeader = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Khaled</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">
                  Ürün Ekle
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-products">
                  Ürünler Listesi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/LoginForm">
                  Login
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
