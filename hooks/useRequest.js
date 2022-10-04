import { useState, useEffect } from "react";
import axios from 'axios';

export const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      setData({});
      try {
        setError({});
        const response = await axios(initUrl);
        if (!ignore) {
          setData(response.data);
          // console.log(response.data);
        };
      } catch (err) {
        setError(err);
        setData({});
      }
      setLoading(false);
    };
    fetchData();
    return (() => { ignore = true; });
  }, [initUrl]);

  return { data, loading, error };
};