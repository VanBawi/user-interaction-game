export default (state, action) => {
	switch (action.type) {
		case 'ADD_USER':
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case 'GET_USERS':
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
		case 'UPDATE_USER':
			return {
				...state,
				user: action.payload,
				users: state.users.map((user) => {
					if (user._id === action.payload._id) {
						return user;
					} else {
						return user;
					}
				}),
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
