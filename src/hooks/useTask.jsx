import { useContext } from "react"
import { MyTaskContext } from "../contexts/MyTaskContext/MyTaskContext"

export const useTask = () => {
    const context = useContext(MyTaskContext);
    return context;
}