import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


export const getScenarios = async () => {
  try {
    const res = await API.get("/scenarios");
    return res.data.success ? res.data.data : [];
  } catch (error) {
    console.error("Critical Failure: Unable to fetch scenario manifest.", error);
    throw error;
  }
};


export const getScenario = async (id) => {
  if (!id) {
    console.error("Initialization Error: No ID provided to getScenario.");
    return null;
  }
  
  try {
    const res = await API.get(`/scenarios/${id}`);
    return res.data.data;
  } catch (error) {
   
    const status = error.response?.status || "NETWORK_DISCONNECT";
    console.error(`[API_ERROR] Status: ${status} | Target: /scenarios/${id}`);
    throw error;
  }
};