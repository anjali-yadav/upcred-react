import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { GOOGLE_CLIENT_ID } from '../constants/googleLogin'
import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	// USER_LOGOUT,
} from '../constants/userConstants'

function GoogleAuth() {
	const dispatch = useDispatch()
	const responseGoogle = (response) => {
		// console.log(response)
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/google-login`,
			data: { idToken: response.tokenId },
		})
			.then((res) => {
				console.log('GOOGLE SIGNIN SUCCESS', res)
				const data = res.data.user
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: data,
				})
				localStorage.setItem('userInfo', JSON.stringify(data))
			})
			.catch((error) => {
				console.log('GOOGLE SIGNIN SUCCESS', error.response)
				dispatch({
					type: USER_LOGIN_FAIL,
					payload: 'wrong credentials',
				})
			})
	}
	return (
		<div>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				theme='dark'
				buttonText='Sign in with Google'
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				style={{ width: '600px' }}
			/>
		</div>
	)
}

export default GoogleAuth
