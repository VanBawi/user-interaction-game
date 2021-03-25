import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Swal from 'sweetalert2';
import { UserGlobalContext } from '../context/UserState';
import { imageArray } from './data';

export const TakeRandomQuiz = () => {
	const { addQuiz, quizzes, getQuizzes } = useContext(GlobalContext);
	const { users, getUsers } = useContext(UserGlobalContext);

	// const [text, setText] = useState('');
	const [amount, setAmount] = useState('');
	const [status, setStatus] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [randomNumber, setRandomNumber] = useState('');
	const [icons, setIcons] = useState([]);

	useEffect(() => {
		getUsers();
		getQuizzes();
	}, []);

	useEffect(() => {
		if (submitted) {
			setTimeout(function () {
				setIcons([]);
				setRandomNumber('');
				setSubmitted(false);
				setStatus(false);
				setAmount('');
			}, 3000);
		}
	}, [submitted]);

	useEffect(() => {
		var arr = [];
		var i;
		for (i = 0; i < randomNumber; i++) {
			arr.push('🔢');
		}

		setIcons(arr);
	}, [randomNumber]);

	const generateRandom = () => {
		const num = Math.floor(Math.random() * 10) + 35;
		setRandomNumber(num);
		return num;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('ammount', amount, icons.length);
		if (Number(amount) === icons.length) {
			// set
			setStatus(true);
			Swal.fire('Yay...', 'Your answer is correct!', 'success');
		} else {
			Swal.fire('Oops...', 'Something went wrong!', 'error');
		}
		submitData();
		setSubmitted(true);
	};

	const submitData = () => {
		const quizData = {
			user_answer: Number(amount),
			correctAnswer: icons.length,
			isCorrect: status,
		};
		addQuiz(quizData);
		console.log('quizData', quizData);
	};

	return (
		<div className='container'>
			<a href='/'>
				<button> go to user</button>
			</a>
			<button onClick={generateRandom}>Start Quiz</button>

			<div className='selected-answers-wrapper'>
				{icons.map((icon, i) => {
					return (
						<div key={i} className='selected-answers-array'>
							{icon}
						</div>
					);
				})}
			</div>

			<form onSubmit={onSubmit}>
				<div className='form-control' style={{ marginTop: '5rem' }}>
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
		</div>
	);
};
