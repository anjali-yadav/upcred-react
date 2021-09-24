require('dotenv').config()
require('./config/db')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4000
const authRouter = require('./routes/authRoute')

app.use('/api', authRouter)
app.listen(port, () => {
	console.log(`Node server started in port ${port}`)
})
