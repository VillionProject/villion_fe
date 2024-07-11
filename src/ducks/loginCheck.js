import {createSlice} from "@reduxjs/toolkit";

const initialIsLoginState = {
  loginInfo : {
      login : false,
      base_location_id: "",
      createdAt: "",
      email: "",
      familyAccount: "",
      grade: "",
      interestCategory: [],
      libraryName: "",
      libraryStatus: "",
      phoneNumber: "",
      profileImage : "",
      userId: "",
      yearlyReadingTarget: "",
  }

}

const loginCheckSlise = createSlice({
  name : 'isLogin',
  initialState : initialIsLoginState,
  reducers : {

    loginInfoSet(state, action) {
      state.loginInfo = action.payload;
    },

    libNameSet(state, action) {
      state.loginInfo.libraryName = action.payload
    },

      libNameStatus(state, action) {
          state.loginInfo.libraryStatus = action.payload
      },

      yearlyReadingTargetSet(state, action) {
          state.loginInfo.yearlyReadingTarget = action.payload
      },

      interestCategorySet(state, action) {
          state.loginInfo.interestCategory = action.payload
      },

      locateSet(state, action) {
          state.loginInfo.base_location_id = action.payload
      },






    isLogin(state, action) {
      state.loginInfo.isLogin = action.payload;
    },

    logout(state, action) {
      state.loginInfo = action.payload;
    }
  }
})

export const loginCheckAction = loginCheckSlise.actions;
export default loginCheckSlise.reducer;