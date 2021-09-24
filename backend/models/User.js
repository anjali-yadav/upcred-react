const { Schema, model } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	googleId: {
		type: String,
	},
	googleSecret: {
		type: String,
	},
	email: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
	},
	login_type: {
		type: String,
		// required: true,
	},
})
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)
const User = model('User', userSchema)
module.exports = User
