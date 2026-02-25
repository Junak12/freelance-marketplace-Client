import { Children, createContext, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const {user} = useAuth();
    const instance = useAxios();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);

    const fetchUser = async() => {
        if (!user?.email) return ;
        try {
            setLoading(true);
            const res = await instance.get(`/users/${user.email}`);
            setUserData(res.data);
        } catch (error) {
            setError('Unable to fetch User Data');
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [user]);

    return (
        <UserContext.Provider
        value={{
            userData,
            loading,
            fetchUser,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}