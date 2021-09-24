import {
	// USER_LOGIN_REQUEST,
	// USER_LOGIN_SUCCESS,
	// USER_LOGIN_FAIL,
	USER_LOGOUT,
	// USER_REGISTER_REQUEST,
	// USER_REGISTER_SUCCESS,
	// USER_REGISTER_FAIL,
} from '../constants/userConstants'

// export const login = (email,password)=> async (dispatch)=>{
//     try {
//         dispatch({
//             type: USER_LOGIN_REQUEST,
//         })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         const {data} = await axios.post('/api/users/login', {email,password})
//     }
// }

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
}
