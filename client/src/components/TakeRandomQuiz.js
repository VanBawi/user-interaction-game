import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Swal from 'sweetalert2';
import { UserGlobalContext } from '../context/UserState';
import { imageArray } from './data';

export const TakeRandomQuiz = () => {
	const { addQuiz, quizzes, getQuizzes } = useContext(GlobalContext);
	const { users, getUsers } = useContext(UserGlobalContext);

	const [amount, setAmount] = useState('');
	const [status, setStatus] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [randomNumber, setRandomNumber] = useState('');
	const [icons, setIcons] = useState([]);
	const [firstIcons, setFirstIcons] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [restIcons, setRestIcons] = useState([]);

	useEffect(() => {
		getUsers();
		getQuizzes();
		const userData = JSON.parse(localStorage.getItem('user_data'));
		setCurrentUser(userData);
	}, []);

	useEffect(() => {
		if (submitted) {
			setTimeout(function () {
				setIcons([]);
				setRandomNumber('');
				setSubmitted(false);
				setStatus(false);
				setAmount('');
			}, 5000);
		}
	}, [submitted]);

	useEffect(() => {
		var arr = [];
		var i;
		for (i = 0; i < randomNumber; i++) {
			arr.push(
				'https://belchaa.com/wp-content/uploads/2019/05/VSDC-Video-Editor-Pro-Crack-v6.3.3.968-Incl-License-Key-List-Portable_Ver.png'
			);
			// arr.push('🔢');
		}

		setIcons(arr);
	}, [randomNumber]);

	useEffect(() => {
		var newIcons = icons;
		const fir = newIcons.splice(0, 25);
		setFirstIcons(fir);
		setRestIcons(newIcons);
	}, [icons]);

	const generateRandom = () => {
		const num = Math.floor(Math.random() * 11) + 46;
		setRandomNumber(num);
		return num;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('ammount', amount, icons.length);
		if (Number(amount) === firstIcons.length + restIcons.length) {
			// set
			setStatus(true);
			Swal.fire('Good job!', 'Keep moving forward!', 'success');
		} else {
			Swal.fire('Oops...', 'Something went wrong!', 'error');
		}
		submitData();
		setSubmitted(true);
	};

	const submitData = () => {
		const quizData = {
			user_id: currentUser ? currentUser._id : '60576e2389e63f07c14d5652',
			user_answer: Number(amount),
			correctAnswer: icons.length,
			isCorrect: status,
		};
		addQuiz(quizData);
	};

	const RandomImg = useRef({
		position: 'absolute',
		top: Math.floor(Math.random() * 50),
		left: '50%',
		transform: 'translate(-50%, -50%)',
	});

	return (
		<div className='container'>
			<a href='/'>
				<button> go to user</button>
			</a>
			<button style={{ marginBottom: '4rem' }} onClick={generateRandom}>
				Start Quiz
			</button>

			<div className='selected-answers-wrapper'>
				{firstIcons &&
					firstIcons.map((icon, i) => {
						return (
							<div key={i} className='upper'>
								<img className='img-icons-over' src={icon} alt='img' />
							</div>
						);
					})}
				{restIcons &&
					restIcons.map((icon, i) => {
						return (
							<div key={i} className='under'>
								<img className='img-icons-over' src={icon} alt='img' />
							</div>
						);
					})}
			</div>

			<form onSubmit={onSubmit}>
				<div className='form-control' style={{ display: 'flex', justifyContent: 'center' }}>
					<input
						style={{ width: '60%' }}
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter your answer...'
					/>
					<div style={{ marginLeft: '1rem', paddingTop: '0.5rem' }}>Pieces</div>
				</div>
				<div style={{ marginTop: '3rem' }}>
					<button className='btn '>Submit</button>
				</div>
			</form>
		</div>
	);
};
