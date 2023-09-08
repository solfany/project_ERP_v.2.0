// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAccessToken: (state, action) => {
//       state.accessToken = action.payload;
//       state.isAuthenticated = true;
//     },
//     setRefreshToken: (state, action) => {
//       state.refreshToken = action.payload;
//     },
//     clearTokens: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
      
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setAccessToken, setRefreshToken, clearTokens } = authSlice.actions;

// export const selectAccessToken = (state) => state.auth.accessToken;
// export const selectRefreshToken = (state) => state.auth.refreshToken;
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  staffInfo: null, // Staff 정보 추가
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setStaffInfo: (state, action) => { // Staff 정보 설정 액션
      state.staffInfo = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.staffInfo = null; // Staff 정보 초기화
      state.isAuthenticated = false;
    },
  },
});


export const { setAccessToken, setRefreshToken, setStaffInfo, clearTokens } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
