export default (state, action) => {
	switch (action.type) {
		case 'GET_ QUIZZES':
			return {
				...state,
				loading: false,
				quizzes: action.payload,
			};
		case 'DELETE_QUIZ':
			return {
				...state,
				quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload),
			};
		case 'ADD_QUIZ':
			return {
				...state,
				quizzes: [...state.quizzes, action.payload],
			};
		case 'QUIZ_ERROR':
			return {
				...state,
				error: action.payload,
			};
		case 'ADD_USER':
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case 'GET_ USERS':
			return {
				...state,
				loading: false,
				users: action.payload,
			};
		case 'DELETE_USER':
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.payload),
			};
		case 'USER_ERROR':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
