const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const quizzes = require('./routes/quizzes');
const users = require('./routes/users');
const app = express();

app.use(express.json());

app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${PORT} mode on port ${PORT}`));
