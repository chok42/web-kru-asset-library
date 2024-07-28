import axios from "axios";

//const processEnv = import.meta.env.VITE_APP_API_LOCAL_URL
const processEnv = 'https://api-kru-asset-library.onrender.com/kru-asset-library/api'
export default axios.create({
  baseURL: processEnv,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": "",
  }
});