import React, { useState, useContext } from 'react';

import { UserGlobalContext } from '../context/UserState';
import { uploadImage } from '../utils/uploadFunction';

export const UploadFile = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [file, setFile] = useState('');
	const [loading, setLoading] = useState(null);
	const { addUser } = useContext(UserGlobalContext);

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

	const onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			_id: 'id',
			receipt: file,
		};
		addUser(newUser);
	};

	return (
		<div className='container'>
			<form onSubmit={onSubmit}>
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
				<a href='/quiz' style={{ textDecoration: 'none' }}>
					<button className='btn'>Upload a file</button>
				</a>
			</form>
		</div>
	);
};
