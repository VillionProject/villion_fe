import {apiClient} from "./ApiClient";

export const myTokenInfo = (token) => apiClient.get('/api/v1/user/me', {
  token : token
})

export const getProducts = (userId) => apiClient.get(`/api/v1/user/getProductsByLocation/${userId}`)

export const getProductsByUser = (productId) => apiClient.get(`/api/v1/product/getLibraryWithProduct/${productId}`)
export const getProductsByUser2 = (productId) => apiClient.get(`/api/v1/product/getProduct/${productId}`)

export const getProductsByCategory = (productId) => apiClient.get(`/api/v1/product/getProductsByCategory/${productId}`)
export const getProductsBySearch = (searchText) => apiClient.get(`/api/v1/product/searchProduct/${searchText}`)

export const getUserRental = (userId) => apiClient.get(`/api/v1/user/getAllCart/${userId}`)
export const getUser = (userId) => apiClient.get(`/api/v1/user/findByID/${userId}`)

export const getMyWished = (userId) => apiClient.get(`/api/v1/user/${userId}/wishProductFolder`)

export const mbtiMethods1 = () => apiClient.get(`/api/v1/user/questions/results`)

export const mbtiCategoryResult = (mbti) => apiClient.get(`/api/v1/user/getMbtiCategory/${mbti}`)

export const categoryGetProduct = (category) => apiClient.get(`/api/v1/product/getCategory/${category}`)

export const getMyFolder = (userId) => apiClient.get(`/api/v1/user/${userId}/wishProductFolder`)


