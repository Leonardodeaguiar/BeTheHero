import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

const Profile = () => {
	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');
	const history = useHistory();
	const [ incidents, setIncidents ] = useState([]);
	useEffect(
		() => {
			api
				.get('profile', {
					headers: {
						Authorization: ongId
					}
				})
				.then((response) => {
					setIncidents(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ ongId ]
	);

	const handleDeleteIncident = async (id) => {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			});
			setIncidents(incidents.filter((incident) => id !== incident.id));
		} catch (err) {
			alert('Erro ao deletar caso.');
		}
	};
	const handleLogout = () => {
		localStorage.clear();
		history.push('/');
	};
	return (
		<div className="profile-container">
			<header>
				<img src={logo} alt="Be the hero" />
				<span>Bem vinda, {ongName}!</span>

				<Link to="/incidents/new" className="button">
					Cadastrar novo caso
				</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#e02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{incidents.map((incident) => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>
						<strong>DESCRIÇÃO:</strong>
						<p>{incident.description}</p>
						<strong>VALOR:</strong>
						<p>
							{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
						</p>
						<button type="button" onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Profile;
