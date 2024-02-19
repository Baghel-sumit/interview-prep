import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (url) =>{
    try {
      setIsLoading(true); 
      const result = await fetch(url);
      const jsonData = await result.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(()=> {
    fetchData(url);
  },[url]);

  return {
    data, isLoading, error
  }
}

export default useFetch
