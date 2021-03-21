import axios from 'axios';

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export const uploadImage = async (file) => {
	const base64File = await toBase64(file);
	var photoUpload = {
		key: 'nnnlwe19219n1b2--u0qjasca',
		photo: base64File,
	};
	const data2 = await axios.post(
		'https://script.google.com/macros/s/AKfycbw4pjCXHwoXEg7K5IEKaFKL1UG_NKntuxyuKJBDERjUVlyrWrhbo8r8fJ4x6VTEvqpj/exec',
		JSON.stringify(photoUpload)
	);
	return data2;
};
