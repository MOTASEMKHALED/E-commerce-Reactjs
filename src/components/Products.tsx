import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from './useProducts';

interface Product {
    id: string;
    productName: string;
    category: string;
    description: String;
    imageUrl: string;
    productPrice: number; 
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { productName, category, description, imageUrl, productPrice } = product;
    return (
        <div className="card">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="text-uppercase">{productName}</h4>
                        <div>
                            <h5 className="text-uppercase mb-0">{category}</h5>
                            <div className="d-flex flex-row user-ratings">
                                <div className="ratings">
                                    {[...Array(description)].map((_, index) => (
                                        <i key={index} className="fa fa-star"></i>
                                    ))}
                                </div>
                                <h6 className="text-muted ml-1">{description}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="imagePd">
                        <img src={imageUrl} alt={productName} />
                    </div>
                </div>
            </Link>
            <p>{category}</p>

            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <span>price</span>
                <div>
                    <span>{productPrice}TL</span> 
                </div>
            </div>
            <button className="btn btn-danger" onClick={() => console.log('Added to cart:', productName)}>
                Add to cart
            </button>
        </div>
    );
};

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

const Products: React.FC = () => {
    const { products, loading, error } = useProducts('http://localhost:8080/products/product');
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error:</div>;
    }

    return (
        <div>
            <ProductGrid products={products} />
        </div>
    );
};

export default Products;
