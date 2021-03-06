const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
// Google Login
exports.googleController = (req, res) => {
	const { idToken } = req.body

	client
		.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
		.then((response) => {
			// console.log('GOOGLE LOGIN RESPONSE',response)
			const { email_verified, name, email } = response.payload
			if (email_verified) {
				User.findOne({ email }).exec((err, user) => {
					if (user) {
						const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
							expiresIn: '7d',
						})
						const { _id, email, name } = user
						return res.json({
							token,
							user: { _id, email, name },
						})
					} else {
						// let password = email + process.env.JWT_SECRET
						user = new User({ name, email })
						user.save((err, data) => {
							if (err) {
								console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
								return res.status(400).json({
									error: 'User signup failed with google',
								})
							}
							const token = jwt.sign(
								{ _id: data._id },
								process.env.JWT_SECRET,
								{ expiresIn: '7d' }
							)
							const { _id, email, name } = data
							return res.json({
								token,
								user: { _id, email, name },
							})
						})
					}
				})
			} else {
				return res.status(400).json({
					error: 'Google login failed. Try again',
				})
			}
		})
}
