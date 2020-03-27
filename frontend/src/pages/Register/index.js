import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

const Register = () => {
	const [ form, setForm ] = useState({
		name: '',
		email: '',
		whatsapp: '',
		city: '',
		uf: ''
	});
	const history = useHistory();
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	const { name, email, whatsapp, city, uf } = form;

	const handleRegister = async (event) => {
		event.preventDefault();
		const data = form;
		try {
			const response = await api.post('ongs', data);
			alert(`Seu ID${response.data.id}`);
			history.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logo} alt="Be the hero" />

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, junte-se a plataforma e ajude pessoas a encontrar os casos em sua cidade</p>
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#e02041" />
						Tenho cadastro
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input placeholder="Nome da ONG" value={name} name="name" onChange={handleChange} />
					<input placeholder="E-mail" type="email" value={email} name="email" onChange={handleChange} />
					<input placeholder="Whatsapp" value={whatsapp} name="whatsapp" onChange={handleChange} />
					<div className="input-group">
						<input placeholder="Cidade" value={city} name="city" onChange={handleChange} />
						<input placeholder="UF" style={{ width: 80 }} value={uf} name="uf" onChange={handleChange} />
					</div>

					<button type="submit" className="button">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
