import React, { useState } from "react";
import Home from "./Home";
import useProducts from "./useProducts";
interface Product {
  id: string;
  productName: string;
  description: string;
  productPrice: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

interface UpdateProductProps {
  onDeleteProduct: (productId: string) => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [editingProductId, setEditingProductId] = useState<string | null>(
    null
  );
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState(0);
  const [editedProductQuantity, setEditedProductQuantity] = useState(0);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterBy(event.target.value);
    setSearchTerm("");
  };

  const handleResetFilter = () => {
    setSearchTerm("");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProductName(product.productName);
    setEditedProductPrice(product.productPrice);
    setEditedProductQuantity(product.quantity);
  };

  const handleSaveProduct = () => {
    console.log("Saving product:", {
      id: editingProductId,
      productName: editedProductName,
      productPrice: editedProductPrice,
      quantity: editedProductQuantity,
    });
    setEditingProductId(null);
    setEditedProductName("");
    setEditedProductPrice(0);
    setEditedProductQuantity(0);
  };

  const { products: fetchedProducts, loading, error } = useProducts(
    `http://localhost:8080/products/product`
  );

  const filteredProducts = fetchedProducts.filter((product: Product) => {
    const searchTermLower = searchTerm.toLowerCase();
    if (
      product &&
      product.id &&
      product.category &&
      product.productName
    ) {
      if (filterBy === "id") {
        return product.id.includes(searchTermLower);
      } else if (filterBy === "category") {
        return product.category.toLowerCase().includes(searchTermLower);
      } else {
        return product.productName.toLowerCase().includes(searchTermLower);
      }
    }
    return false;
  });

  return (
    <div className="d-flex">
      <Home />
      <div className="ViewPro">
        <div className="mb-3 d-flex justify-content-between">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder={`Search by ${
                filterBy === "id" ? "ID" : "Name/Supplier"
              }`}
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
          <div>Error: {}</div>
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
                  <th>Action</th>
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
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      {editingProductId === product.id ? (
                        <input
                          type="text"
                          value={editedProductName}
                          onChange={(e) => setEditedProductName(e.target.value)}
                        />
                      ) : (
                        product.productName
                      )}
                    </td>
                    <td>{product.description}</td>
                    <td>
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          value={editedProductPrice}
                          onChange={(e) =>
                            setEditedProductPrice(parseFloat(e.target.value))
                          }
                        />
                      ) : (
                        `$${product.productPrice}`
                      )}
                    </td>
                    <td>
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          value={editedProductQuantity}
                          onChange={(e) =>
                            setEditedProductQuantity(parseInt(e.target.value))
                          }
                        />
                      ) : (
                        product.quantity
                      )}
                    </td>
                    <td>{product.category || "-"}</td>
                    <td>
                      {editingProductId === product.id ? (
                        <button
                          className="btn btn-success"
                          onClick={handleSaveProduct}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                      )}
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

export default UpdateProduct;
