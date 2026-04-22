import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const submitOrder = async (formData) => {
  const response = await api.post('/orders', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export default api
