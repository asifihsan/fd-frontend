import { useState, useEffect } from "react";

const useFetch = <T,>(url: string, refreshInterval?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    let interval: number | undefined;
    if (refreshInterval) {
      interval = window.setInterval(fetchData, refreshInterval);
    }

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [url, refreshInterval]);

  return { data, loading, error };
};

export default useFetch;
