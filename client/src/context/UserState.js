import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import UserReducer from './UserReducer';

// Initial state
const initialState = {
	error: null,
	loading: true,
	users: [],
};

// Create context
export const UserGlobalContext = createContext(initialState);

// Provider component
export const UserGlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);
	// Actions
	async function getUsers() {
		try {
			const res = await axios.get('/api/v1/users');

			dispatch({
				type: 'GET_USERS',
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'USER_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	async function deleteUser(id) {
		try {
			await axios.delete(`/api/v1/users/${id}`);

			dispatch({
				type: 'DELETE_USER',
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: 'USER_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	async function addUser(user) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/users', user, config);

			dispatch({
				type: 'ADD_USER',
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'USER_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	return (
		<UserGlobalContext.Provider
			value={{
				error: state.error,
				loading: state.loading,
				users: state.users,
				getUsers,
				addUser,
				deleteUser,
			}}>
			{children}
		</UserGlobalContext.Provider>
	);
};
