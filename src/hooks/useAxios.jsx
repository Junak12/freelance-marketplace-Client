import axios from "axios";

// Create Axios instance pointing to your deployed backend
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // use the .env variable
});

const useAxios = () => {
  return instance;
};

export default useAxios;
