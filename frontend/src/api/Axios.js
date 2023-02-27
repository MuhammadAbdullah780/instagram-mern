import axios from 'axios'

const token = JSON.parse(localStorage.getItem('token'))
const axiosApi = axios.create({
    baseURL: 'http://localhost:5700/api',
    headers: {
        authorization: token ? `Bearer ${token}` : null,
        'Content-Type':'application/json',
    }
})

export default axiosApi;