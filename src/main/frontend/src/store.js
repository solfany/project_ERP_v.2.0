import { createStore } from 'redux';
import { UPDATE_CART_ITEMS_COUNT } from './action';
const initialState = {
  sidebarShow: true,
  cartItemsCount: 0,
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    case UPDATE_CART_ITEMS_COUNT:
      return {
        ...state,
        cartItemsCount: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
