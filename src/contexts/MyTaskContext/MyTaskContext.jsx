import { createContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

export const MyTaskContext = createContext();

export const MyTaskProvider = ({children}) => {

    const instance = useAxios();
    const {user} = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   const fetchTask = async () => {
     if (!user?.email) return;
     try {
       setLoading(true);
       const res = await instance.get(`/my-task-collection/${user.email}`);
       setTasks(res.data);
     } catch (err) {
       setError("Failed to load accepted tasks");
     } finally {
       setLoading(false);
     }
   };

    useEffect(() => {
        fetchTask();
    }, [user, instance]);
    return (
        <MyTaskContext.Provider 
        value={{
            tasks, 
            loading,
            error,
            fetchTask,
        }}
        >
            {children}
        </MyTaskContext.Provider>
    )
}