import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const MyAddedContext = createContext();

export const MyAddedProvider = ({children}) => {

    const {user} = useAuth();
    const instance = useAxios();

    const [addedTasks, setAddedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetcAddedhData = async() => {
        if (!user?.email) return;
        try {
            setLoading(true);
            const result = await instance.get(`/my-add-job/${user.email}`);
            setAddedTasks(result.data);
        } catch (error) {
            setError("Failed to load accepted tasks");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetcAddedhData();
    },[instance, user])

    return (
      <MyAddedContext.Provider
        value={{
          addedTasks,
          loading,
          error,
          fetcAddedhData,
        }}
      >
        {children}
      </MyAddedContext.Provider>
    );
}