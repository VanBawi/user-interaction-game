const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const quizzes = require('./routes/quizzes');
const users = require('./routes/users');
const app = express();

app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('dev'));
// }

app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${PORT} mode on port ${PORT}`));
