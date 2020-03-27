import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

const Logon = () => {
	const [ id, setID ] = useState('');
	const history = useHistory();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('session', { id });
			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', response.data.name);
			history.push('/profile');
		} catch (err) {
			alert('Falha no login');
		}
	};

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logo} alt="Be The Hero" />
				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>

					<input
						type="text"
						value={id}
						name="id"
						onChange={(e) => {
							setID(e.target.value);
						}}
						placeholder="Sua ID"
					/>
					<button className="button" type="submit">
						Entrar
					</button>

					<Link to="/register">
						<FiLogIn size={16} color="#e02041" />
						Não tenho cadastro
					</Link>
				</form>
			</section>
			<img src={heroesImg} alt="Heroes" />
		</div>
	);
};

export default Logon;
