import React, { useState } from 'react';
import useFormData from './useFormData';
import Home from './Home';

const AddProduct: React.FC = () => {
  const { formData, handleChange, handleSubmit, resetForm } = useFormData({
    id: '',
    productName: '',
    description: '',
    productPrice: 0,
    quantity: 0,
    category: '',
    imageUrl: '',
  });

  const [image, setImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAddProduct = async () => {
    try {
      const productData = {
        ...formData,
        imageUrl: image, // Use the base64 string
      };
      await handleSubmit(productData); // Send form data with base64 image to backend
      resetForm(); // Reset form fields after successful submission
      setImage(null); // Reset image
      setPreviewUrl(null); // Reset preview URL
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className="d-flex">
      <Home />
      <div className="addPro">
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="productId"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Category:
          </label>
          <input
            type="text"
            className="form-control"
            id="productCategory"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img src={previewUrl} alt="Product Preview" style={{ width: '200px', marginTop: '10px' }} />
          )}
        </div>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
