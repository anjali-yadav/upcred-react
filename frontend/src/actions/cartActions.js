import { ADD_TO_CART } from '../constants/cartConstants'

export const addToCart = (product, qnt) => (dispatch, getState) => {
	dispatch({
		type: ADD_TO_CART,
		payload: {
			product,
			qnt,
		},
	})
	// console.log('action done')
	// localStorage.setItem('cartItems', JSON.stringify(getState().cartItems))
}
