require('dotenv').config()
require('./config/db')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
// const mongoose = require('mongoose')
// const passport = require('passport')
const port = process.env.PORT || 4000
const authRouter = require('./routes/authRoute')
// require('./models/User') // Note model must be imported before passport
// require('./services/passport')

// connect with mongo db
// mongoose.connect(
// 	process.env.MONGODB_URI,
// 	{ useNewUrlParser: true, useUnifiedTopology: true },
// 	() => {
// 		console.log('connnected to mongo DB')
// 	}
// )

// app.use(passport.initialize())
// app.use(passport.session())
/* ================ Creating Cookie Key and link with Passport JS: End ================  */

// require('./routes/authRoute')(app)
app.use('/api', authRouter)
app.listen(port, () => {
	console.log(`Node server started in port ${port}`)
})
