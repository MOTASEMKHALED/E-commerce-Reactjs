import React, { useState } from 'react';
import Home from '../components/Home';
import useProducts from '../components/useProducts';

interface Product {
  id: string;
  productName: string;
  description: string;
  productPrice: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

interface ViewProductsProps {
  onDeleteProduct: (productId: string) => void;
}

const ViewProducts: React.FC<ViewProductsProps> = ({ onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
    setSearchTerm('');
  };

  const handleResetFilter = () => {
    setSearchTerm('');
  };

  const { products: fetchedProducts, loading, error } = useProducts(`http://localhost:8080/products/product`);

  const filteredProducts = fetchedProducts.filter((product: Product) => {
    const searchTermLower = searchTerm.toLowerCase();
    if (product && product.id && product.category && product.productName) {
      if (filterBy === 'id') {
        return product.id.includes(searchTermLower);
      } else if (filterBy === 'category') {
        return product.category.toLowerCase().includes(searchTermLower);
      } else {
        return product.productName.toLowerCase().includes(searchTermLower);
      }
    }
    return false;
  });


  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
       
        }
      });
  
 
      if (response.ok) {
 
    
        onDeleteProduct(productId); 
      } else {
       
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  return (
    <div className="d-flex">
      <Home />
      <div className="ViewPro">
        <div className="mb-3 d-flex justify-content-between">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder={`Search by ${filterBy === 'id' ? 'ID' : 'Name/Supplier'}`}
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              className="form-select"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="name">Name</option>
              <option value="id">ID</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <button className="btn btn-secondary" onClick={handleResetFilter}>
            Reset Filter
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div> 
        ) : filteredProducts.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No products found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: Product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>${product.productPrice}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category || '-'}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product.id)} 
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
