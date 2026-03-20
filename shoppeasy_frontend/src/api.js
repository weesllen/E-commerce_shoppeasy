import axios from "axios"
import { jwtDecode } from "jwt-decode"

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "")

export const BASE_URL = API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL
})


api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access")

        if(token){
            const decoded = jwtDecode(token)
            const expiry_Date = decoded.exp
            const current_time = Date.now() / 1000
            
            if(expiry_Date > current_time){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
  
    (error) => {
        return Promise.reject(error)
    }
)

export default api
