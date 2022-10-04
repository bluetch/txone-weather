import { useState, useEffect } from "react";
import axios from 'axios';

export const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      setData({});
      try {
        setError({});
        const response = await axios(initUrl);
        if (!ignore) {
          setData(response.data);
          console.log(response.data);
        };
      } catch (err) {
        console.log("here")
        setError(err);
        setData({});
      }
      setLoading(false);
    };
    fetchProduct();
    return (() => { ignore = true; });
  }, [initUrl]);

  return { data, loading, error };
};