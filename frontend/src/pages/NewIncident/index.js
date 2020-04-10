import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

const NewIncident = () => {
	const token = `Bearer ${localStorage.getItem('token')}`;
	const history = useHistory();

	const [ incident, setIncident ] = useState({
		title: '',
		description: '',
		value: ''
	});

	const createIncident = async (event) => {
		event.preventDefault();
		try {
			await api.post(`incidents`, incident, {
				headers: {
					Authorization: token
				}
			});
			history.push('/profile');
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setIncident({ ...incident, [name]: value });
	};
	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logo} alt="Be the hero" />

					<h1>Cadastrar novo caso</h1>
					<p>Cadastre um novo caso para sua ong</p>
					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#e02041" />
						Voltar para home
					</Link>
				</section>
				<form onSubmit={createIncident}>
					<input onChange={handleChange} name="title" placeholder="Titulo do Caso" />
					<textarea onChange={handleChange} name="description" placeholder="Descrição" />
					<input onChange={handleChange} name="value" placeholder="Valor em reais" />

					<button type="submit" className="button">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewIncident;
