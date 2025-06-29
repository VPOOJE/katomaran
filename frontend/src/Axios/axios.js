import axios from "axios"
const instance = axios.create({
    baseURL:"https://katomaran.onrender.com/api"
})
export default instance