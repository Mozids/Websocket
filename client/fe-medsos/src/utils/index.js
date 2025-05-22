import axios from 'axios'

export const APISERVICE = () => axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timmeout: 10000,
})

export const config = (token) => ({
        headers : {
            Accept: 'Application/json',
            Authorization: `Bearer ${token}`,
        }
    })