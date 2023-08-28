// actions.js
export const UPDATE_CART_ITEMS_COUNT = 'SET_CART_ITEMS_COUNT';

export const updateCartItemsCount = (count) => ({
  type: UPDATE_CART_ITEMS_COUNT,
  payload: count,
});
