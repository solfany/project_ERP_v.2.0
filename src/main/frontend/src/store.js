import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import { createStore, combineReducers } from 'redux';
import { LOGIN_SUCCESS, UPDATE_CART_ITEMS_COUNT } from './action';
import reducer from './reducer';

const initialState = {
  sidebarShow: true,
  cartItemsCount: 0,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
const rootReducer = combineReducers({
  auth: reducer,
  changeState: reducer,
});

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    case UPDATE_CART_ITEMS_COUNT:
      return {
        ...state,
        cartItemsCount: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
