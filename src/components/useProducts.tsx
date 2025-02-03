import { useState, useEffect } from "react";
import axios from "axios"; 

const useProducts = (url: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        setProducts(response.data);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { products, loading, error };
};

export default useProducts;
