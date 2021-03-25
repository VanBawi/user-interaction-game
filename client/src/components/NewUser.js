import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserGlobalContext } from '../context/UserState';
import { uploadImage } from '../utils/uploadFunction';

export const NewUser = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [user, setUser] = useState({});
	const { addUser } = useContext(UserGlobalContext);

	useEffect(() => {
		setUser({});
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name,
			phone,
		};
		addUser(newUser);
		setUser(newUser);
	};

	if (Object.keys(user).length !== 0 && user.constructor === Object) {
		return <Redirect to='/image' />;
	}

	return (
		<div className='container'>
			<h3>Add New User</h3>
			<form onSubmit={onSubmit}>
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

				<button className='btn'> Let's Start</button>
			</form>
		</div>
	);
};
