import axios from 'axios'

const apiInstance = axios.create({
  baseURL: '/api',
})

export { apiInstance }
