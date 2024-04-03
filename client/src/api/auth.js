import axios from 'axios'

const api = "http://localhost:3000/api"

export const registerRequest = user => axios.post(`${api}/register`, user)