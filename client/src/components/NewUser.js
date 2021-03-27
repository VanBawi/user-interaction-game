import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserGlobalContext } from '../context/UserState';
import { uploadImage } from '../utils/uploadFunction';

export const NewUser = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [user, setUser] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const { addUser } = useContext(UserGlobalContext);

	useEffect(() => {
		setUser({});
		const userData = JSON.parse(localStorage.getItem('user_data'));
		setCurrentUser(userData);
	}, []);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user_data'));
		setCurrentUser(userData);
	}, [user]);

	const onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name,
			phone,
		};
		addUser(newUser);
		setUser(newUser);
	};

	// if (Object.keys(currentUser).length !== 0 && currentUser.constructor === Object) {
	// 	return <Redirect to={`/${currentUser._id}`} />;
	// }

	return (
		<div className='container'>
			<h3>Add New User</h3>
			<form>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<input
						type='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Enter name...'
					/>
				</div>
				<div className='form-control' style={{ marginBottom: '5rem' }}>
					<label htmlFor='phone'>Phone Number</label>
					<input
						type='number'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='018 xxx xxxx'
					/>
				</div>
			</form>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button className='btn' onClick={(e) => onSubmit(e)}>
					Create User
				</button>
				<a href={`/${currentUser._id}`} style={{ textDecoration: 'none' }}>
					<button className='btn'>Let's Start</button>
				</a>
			</div>
		</div>
	);
};
