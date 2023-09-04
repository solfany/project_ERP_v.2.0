// // reducer.js

// import { UPDATE_CART_ITEMS_COUNT, LOGIN_SUCCESS } from './action';

// const initialState = {
//   cartItemsCount: 0,
//   token: null // 초기값은 null로 설정
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_CART_ITEMS_COUNT:
//       return {
//         ...state,
//         cartItemsCount: action.payload,
//       };
//       case LOGIN_SUCCESS:
//         return {
//           ...state,
//           token: action.payload
//         };
//     default:
//       return state;
//   }
// };

// export default reducer;
