const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/userController');

router.route('/').post(addUser).patch(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router;
