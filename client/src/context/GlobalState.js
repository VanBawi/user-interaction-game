import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
	quizzes: [],
	error: null,
	loading: true,
	users: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
	async function getQuizzes() {
		try {
			const res = await axios.get('/api/v1/quizzes');

			dispatch({
				type: 'GET_QUIZZES',
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'QUIZ_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	async function deleteQuiz(id) {
		try {
			await axios.delete(`/api/v1/quizzes/${id}`);

			dispatch({
				type: 'DELETE_QUIZ',
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: 'QUIZ_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	async function addQuiz(quiz) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/quizzes', quiz, config);

			dispatch({
				type: 'ADD_QUIZ',
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'QUIZ_ERROR',
				payload: err.response.data.error,
			});
		}
	}

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
		<GlobalContext.Provider
			value={{
				quizzes: state.quizzes,
				error: state.error,
				loading: state.loading,
				users: state.users,
				getQuizzes,
				deleteQuiz,
				addQuiz,
				getUsers,
				addUser,
				deleteUser,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
