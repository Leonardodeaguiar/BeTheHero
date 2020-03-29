import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';

const Incidents = () => {
	const [ incidents, setIncidents ] = useState([]);
	const [ total, setTotal ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ loading, setLoading ] = useState(false);

	const navigation = useNavigation();

	const navigationToDetail = (incident) => {
		navigation.navigate('Detail', { incident });
	};
	const loadIncidents = async () => {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		setLoading(true);

		const response = await api.get('incidents', {
			params: {
				page
			},
			headers: {
				Authorization: '9b0157d0'
			}
		});
		setIncidents([ ...incidents, ...response.data ]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);
		setLoading(false);
	};

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total} Casos.</Text>
				</Text>
			</View>

			<Text style={styles.title}>Bem Vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o Dia!</Text>

			<FlatList
				data={incidents}
				style={styles.incidentList}
				keyExtractor={(incident) => String(incident.id)}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>

						<Text style={styles.incidentProperty}>CASO:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>

						<Text style={styles.incidentProperty}>VALOR:</Text>
						<Text style={styles.incidentValue}>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.value)}
						</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => {
								navigationToDetail(incident);
							}}
						>
							<Text style={styles.detailsButtonText}>Mais detalhes</Text>
							<Feather name="arrow-right" size={16} color="#e02141" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

export default Incidents;
