import axios from "axios"

export const API = axios.create({
    baseURL: 'https://airlabs.co/api/v9/',
    timeout: 150000,
})