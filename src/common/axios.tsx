import axios from "axios";

//const processEnv = import.meta.env.VITE_APP_API_LOCAL_URL
const processEnv = 'http://localhost:49233/kru-asset-library/api'
export default axios.create({
  baseURL: processEnv,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": "",
  }
});