const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
// mongoose.set('useCreateIndex', true)

const db = mongoose.connection
// db.collection.drop()

db.on('error', (error) => console.log(error))
db.on('open', () => console.log('connected db successfully!'))
