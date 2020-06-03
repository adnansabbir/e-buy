import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (initialCount, cartItem) =>
                initialCount + cartItem.quantity,
            0)
);