import React from 'react'
import { useSelector } from 'react-redux'

function HomePage() {
	const isLoggedIn = useSelector((state) => state.userLogin.userInfo)
	return (
		<div>
			<h1>MY UPCRED ASSIGNMENT</h1>
			{isLoggedIn ? (
				<h2>You are signed in.</h2>
			) : (
				<h2>Please Sign in to continue</h2>
			)}
		</div>
	)
}

export default HomePage
