import axios from 'axios'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'appliation/json'
    }
})
export default apiClient