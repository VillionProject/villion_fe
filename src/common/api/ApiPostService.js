import {apiClient} from "./ApiClient";


export const userLogin = (email, password) => apiClient.post(`/api/v1/user/login2`, {
  email,
  password
})


export const userSignUp = (email, password, libraryName) => apiClient.post(`/api/v1/user/signup`, {
    email,
    password,
    libraryName
})
