import axios from "axios";

// 104.197.46.54
export const apiClient = axios.create(
    {
        baseURL : 'http://34.121.58.202:8000'
        // baseURL : 'http://192.168.0.108:8000'
    }
);