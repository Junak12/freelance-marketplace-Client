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

    useEffect(() => {
        if (!user?.email) return;
        const fetchData = async() => {
            try {
                setLoading(true);
                const res = await instance.get(
                  `/my-task-collection/${user.email}`,
                );
                setTasks(res.data);
            } catch (error) {
                setError("Failed to load accepted tasks");
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [user, instance]);
    return (
        <MyTaskContext.Provider 
        value={{
            tasks, 
            loading,
            error,
        }}
        >
            {children}
        </MyTaskContext.Provider>
    )
}