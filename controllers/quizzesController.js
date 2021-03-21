const Quiz = require('../models/Quiz');

// @desc    Get all quizzes
// @route   GET /api/v1/quizzes
// @access  Public
exports.getQuizzes = async (req, res, next) => {
	try {
		const quizzes = await Quiz.find();

		return res.status(200).json({
			success: true,
			count: quizzes.length,
			data: quizzes,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

// @desc    Add quiz
// @route   POST /api/v1/quizzes
// @access  Public
exports.addQuiz = async (req, res, next) => {
	try {
		const quiz = await Quiz.create(req.body);

		return res.status(201).json({
			success: true,
			data: quiz,
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);

			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	}
};

// @desc    Delete quiz
// @route   DELETE /api/v1/quizzes/:id
// @access  Public
exports.deleteQuiz = async (req, res, next) => {
	try {
		const quiz = await Quiz.findById(req.params.id);

		if (!quiz) {
			return res.status(404).json({
				success: false,
				error: 'No quiz found',
			});
		}

		await quiz.remove();

		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};
