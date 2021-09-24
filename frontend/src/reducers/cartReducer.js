import { ADD_TO_CART } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			let item = action.payload.product
			item = { ...item, qnt: 1 }
			console.log(item, 'here')
			const existItem = state.cartItems.find((i) => i.id === item.id)
			console.log(existItem)
			let new_item
			if (existItem) {
				const new_qnt = existItem.qnt + 1
				new_item = { ...existItem, qnt: new_qnt }
			}
			console.log(existItem)
			console.log(new_item, 'heyyyy')
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.id === existItem.id ? new_item : x
					),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}
		// case CART_REMOVE_ITEM:
		// 	return {
		// 		...state,
		// 		cartItems: state.cartItems.filter((x) => x.product !== action.payload),
		// 	}
		default:
			return state
	}
}
