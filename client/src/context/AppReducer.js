export default (state, action) => {
	switch (action.type) {
		case 'GET_QUIZZES':
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
		default:
			return state;
	}
};
