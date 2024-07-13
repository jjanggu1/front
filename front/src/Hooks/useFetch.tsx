import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:4000";

const useFetch = (resource: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

  const fetchData = async (): Promise<any[]> => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/${resource}`);
      setData(res.data);
      return res.data; // 데이터 반환
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      return []; // 오류 발생 시 빈 배열 반환
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]);

  return { data, loading, error, fetchData };
};

export default useFetch;
