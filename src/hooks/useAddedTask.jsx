import { useContext } from "react"
import { MyAddedContext } from "../contexts/MyAddedContext/MyAddedContext"

export const useAddedTask = () => {
    const context = useContext(MyAddedContext);
    return context;
}