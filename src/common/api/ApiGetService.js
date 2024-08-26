import {apiClient} from "./ApiClient";

export const myTokenInfo = (token) => apiClient.get('/api/v1/user/me', {
  token : token
})

export const getProducts = (userId) => apiClient.get(`/api/v1/user/getProductsByLocation/${userId}`)

export const getProductsByUser = (productId) => apiClient.get(`/api/v1/product/getLibraryWithProduct/${productId}`)

export const getProductsByCategory = (productId) => apiClient.get(`/api/v1/product/getProductsByCategory/${productId}`)












