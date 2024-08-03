import axios from "axios";

export const processEnv = 'http://localhost:49233/kru-asset-library/api'
//export const processEnv = 'https://api-kru-asset-library.onrender.com/kru-asset-library/api'

export default axios.create({
  baseURL: processEnv,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": "",
  }
});