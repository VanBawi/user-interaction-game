const mongoose = require('mongoose');
// console.log('process.env', process.env);
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(`Error: ${err.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
