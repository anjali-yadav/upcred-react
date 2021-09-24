import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducer from './reducers/rootReducer'
import { userLoginReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	cart: cartReducer,
})

// console.log(localStorage.getItem('cartItems'))
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
const userInfoFromStorage =
	localStorage.getItem('userInfo') !== undefined
		? JSON.parse(localStorage.getItem('userInfo'))
		: null

// const cartItemsFromStorage = []
// const userInfoFromStorage = null

const initialState = {
	userLogin: { userLogin: userInfoFromStorage },
	cart: { cartItems: cartItemsFromStorage },
}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
