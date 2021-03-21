import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { uploadImage } from '../utils/uploadFunction';

export const NewUser = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [file, setFile] = useState('');
	const [loading, setLoading] = useState(null);

	const { addUser } = useContext(GlobalContext);

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setLoading(true);
		}
		const fileData = await uploadImage(file);

		if (fileData.data) {
			setFile(fileData.data);
			setLoading(false);
		}
	};

	// console.log('file', file);

	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name,
			phone,
			receipt: file,
		};

		addUser(newUser);
	};

	return (
		<>
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
				<div className='form-control'>
					<label htmlFor='phone'>Phone Number</label>
					<input
						type='number'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='018 xxx xxxx'
					/>
				</div>

				<div className='form-control'>
					<label htmlFor='file'>Receipt </label>
					<input
						type='file'
						name='file'
						accept='video/*,image/*, .pdf/*, .pptx'
						onChange={(e) => uploadFile(e)}
					/>
				</div>
				<div>
					<p style={{ color: 'green' }}> {loading ? 'uploading ...' : null} </p>
				</div>
				<button className='btn'>Add User</button>
			</form>
		</>
	);
};
