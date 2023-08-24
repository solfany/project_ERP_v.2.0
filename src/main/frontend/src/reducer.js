// reducer.js
import { UPDATE_CART_ITEMS_COUNT } from './actions';

const initialState = {
  cartItemsCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART_ITEMS_COUNT:
      return {
        ...state,
        cartItemsCount: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
