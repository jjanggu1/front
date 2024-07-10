import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:4000";

const useFetch = (resource: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

  const fetchData = async () => {
    // 로딩중
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${resource}`);
      await setData(res.data);

      return data;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    fetchData();
  })

  return {data, loading, error};
};

export default useFetch;
