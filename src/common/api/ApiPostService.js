import {apiClient} from "./ApiClient";
import axios from "axios";


export const userLogin = (email, password) => apiClient.post(`/api/v1/user/login2`, {
  email,
  password
})


export const userSignUp = (email, password, libraryName) => apiClient.post(`/api/v1/user/signup`, {
    email,
    password,
    libraryName
})

export const updateLibrary = (id, libraryName, libraryStatus, interstCategory, yearlyReadingTarget, base_location_id) => {
    return apiClient.put(`/api/v1/user/updateLibrary/${id}`, {
        libraryName,
        libraryStatus,
        interstCategory,
        yearlyReadingTarget,
        base_location_id
    });
};

export const registerBook = (ownerUserId, bookName, category, productStatus, stockQuantity, rentalPrice, rentalMethod, rentalLocation, description, rentable, purchasable, productImg) => {
    return apiClient.post(`/api/v1/user/addProduct/${ownerUserId}`, {
        ownerUserId,
        bookName,
        category,
        productStatus,
        stockQuantity,
        rentalPrice,
        rentalMethod,
        rentalLocation,
        description,
        rentable,
        purchasable,
        productImg
    });
};

export const addDeliveryOrder = (ownerUserId, renterUserId, userName, phoneNumber, address, deliveryMemo, rentalStartDate, rentalEndDate, shippingCost, usedPoints, orderList, paymentMethod) => {
    return apiClient.post(`/api/v1/user/addDeliveryOrder/${ownerUserId}`, {
        renterUserId,
        userName,
        phoneNumber,
        address,
        deliveryMemo,
        rentalStartDate,
        rentalEndDate,
        shippingCost,
        usedPoints,
        orderList,
        paymentMethod
    });
};


export const addCart = (userId, ownerUserId, productId, author, publisher, status, rentalQuantity, rentalPeriod, rentalPrice, rentable, purchasable, rentalMethod) => {
    return apiClient.post(`/api/v1/user/addCart`, {
        userId,
        ownerUserId,
        productId,
        author,
        publisher,
        status,
        rentalQuantity,
        rentalPeriod,
        rentalPrice,
        rentable,
        purchasable,
        rentalMethod
    });
};


export const deleteCart = (userId, productId) => {
    return apiClient.post(`/api/v1/user/deleteCart/${userId}/${productId}`);
};

export const deleteAllCart = (userId) => {
    return apiClient.post(`/api/v1/user/deleteAllCart/${userId}`);
};

export const wishedToggle = (userId, folderName, productId) => {
    return apiClient.post(`/api/v1/user/${userId}/wishProduct/toggle`, {
        folderName,
        productId
    });
};

export const mbtiMethods2 = (currentCategoryIndex, currentQuestionIndex, choice) => {
    return apiClient.post(`/api/v1/user/questions/${currentCategoryIndex}/${currentQuestionIndex}/${choice}`);
};

export const mbtiMethods3 = () => {
    return apiClient.post(`/api/v1/user/questions/clear`);
};

export const userMbtiSave = (userId, mbti) => {
    return apiClient.post(`/api/v1/user/saveMbti/${userId}/${mbti}`);
};

export const userProfileImageChange = (userId, profileLink) => {
    return apiClient.patch(`/api/v1/user/updateProfileImage/${userId}/${profileLink} `);
};

export const userFolderCreate = (userId, folderName) => {
    return apiClient.post(`/api/v1/user/${userId}/wishProduct/folder`, {
        folderName
    });
};