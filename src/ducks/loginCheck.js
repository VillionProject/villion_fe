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
      yearlyReadingTarget: ""
  }

}

const loginCheckSlise = createSlice({
  name : 'isLogin',
  initialState : initialIsLoginState,
  reducers : {

    loginInfoSet(state, action) {
      state.loginInfo = action.payload;
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