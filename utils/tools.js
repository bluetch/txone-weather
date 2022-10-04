import { useState, useEffect } from "react";
import axios from 'axios';

export const clsx = (conditionals, others) => {
  return [
    others,
    Object.keys(conditionals)
      .filter((key) => conditionals[key])
      .join(" "),
  ].join(" ");
};

// export const fetcher = async (url, { setState }) => {
//   const req = await fetch(url)
//     .then(async (res) => {
//       return {
//         isOk: res.ok,
//         statusCode: res.status,
//         data: await res.json(),
//       };
//     })
//     .then(async (res) => {
//       setState(res.data);
//     })
//     .catch((error) => {
//       console.warn(error);
//       return {
//         isOk: false,
//         data: error,
//       };
//     });
// };

export const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        setError({});
        const response = await axios(initUrl);
        if (!ignore) {
          setData(response.data)
          // console.log(response.data)
        };
      } catch (err) {
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