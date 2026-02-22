import { createContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const instance = useAxios();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/AllJobs");
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, setData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
