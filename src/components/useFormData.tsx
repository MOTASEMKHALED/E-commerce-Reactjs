import { useState } from 'react';
import axios from 'axios';

const useFormData = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8080/products', data);
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return { formData, handleChange, handleSubmit, resetForm };
};

export default useFormData;
