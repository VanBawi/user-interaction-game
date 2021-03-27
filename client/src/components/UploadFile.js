import React, { useState, useContext, useEffect } from 'react';

import { UserGlobalContext } from '../context/UserState';
import { uploadImage } from '../utils/uploadFunction';

export const UploadFile = (props) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [file, setFile] = useState('');
	const [loading, setLoading] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [updatedUser, setUpdatedUser] = useState({});
	const [updated, setUpdated] = useState(false);
	const { updateUser } = useContext(UserGlobalContext);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user_data'));
		setCurrentUser(userData);
	}, []);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user_data'));
		setUpdatedUser(userData);
	}, [currentUser, updated]);

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
			_id: currentUser._id,
			receipt: file,
		};
		updateUser(newUser);
		setUpdated(true);
	};

	return (
		<div className='container'>
			<div>
				{updatedUser && updatedUser.receipt ? (
					<img
						style={{
							margin: '0 auto',
							width: '100%',
							height: '400px',
							objectFit: 'contain',
						}}
						src={updatedUser.receipt}
						alt='receipt'
					/>
				) : null}
			</div>
			<form>
				<div className='form-control'>
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
			</form>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button className='btn' onClick={(e) => onSubmit(e)}>
					Upload a file
				</button>

				<a href='/quiz' style={{ textDecoration: 'none' }}>
					<button className='btn'>Next</button>
				</a>
			</div>
		</div>
	);
};
