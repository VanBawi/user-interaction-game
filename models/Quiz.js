const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
	user_answer: {
		type: Number,
		required: [true, 'Please insert your answer'],
	},
	correctAnswer: {
		type: Number,
	},
	isCorrect: {
		type: String,
	},
	user_id: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Quiz', QuizSchema);
