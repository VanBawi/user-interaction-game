const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		// console.log('users controller', users);
		return res.status(200).json({
			success: true,
			count: users.length,
			data: users,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

// @desc    Add user
// @route   POST /api/v1/users
// @access  Public
exports.addUser = async (req, res, next) => {
	try {
		const user = await User.create(req.body);

		// localStorage.setItem('user', user);

		return res.status(201).json({
			success: true,
			data: user,
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

// @desc    Add user
// @route   POST /api/v1/users
// @access  Public
exports.updateUser = async (req, res, next) => {
	console.log('req.body in controller', req.body);
	try {
		const user = await User.findByIdAndUpdate(req.body._id, req.body, { new: true });

		return res.status(201).json({
			success: true,
			data: user,
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

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Public
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				error: 'No user found',
			});
		}

		await user.remove();

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
