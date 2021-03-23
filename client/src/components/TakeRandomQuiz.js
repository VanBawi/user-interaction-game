import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Swal from 'sweetalert2';
import { UserGlobalContext } from '../context/UserState';

export const TakeRandomQuiz = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState([]);
	const [status, setStatus] = useState(false);

	const { addQuiz, quizzes, getQuizzes } = useContext(GlobalContext);
	const { users, getUsers } = useContext(UserGlobalContext);

	useEffect(() => {
		getUsers();
		getQuizzes();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const quizData = {
			user_answer: amount,
			correctAnswer: correctAnswer.length,
			isCorrect: status,
		};
		addQuiz(quizData);
	};

	// var test = Math.floor(Math.random() * 11) + 20
	console.log('users', users);
	return (
		<>
			<a href='/'>
				<button> go to user</button>
			</a>
			{/* {amount ? Swal.fire('Oops...', 'Something went wrong!', 'success') : null} */}

			<form onSubmit={onSubmit}>
				<div className='form-control'></div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Answer <br />
					</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button className='btn'>submit</button>
			</form>
		</>
	);
};
