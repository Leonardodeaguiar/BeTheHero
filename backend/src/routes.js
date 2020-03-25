const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileControler');
const SessionControler = require('./controllers/SessionController');
const routes = express.Router();

/**
 * Rota / Recurso
 */

/**
	* Métodos HTTP: 
	* Obs.: Rest é o uso do conjunto todo
	*
	* GET: Buscar uma informação do back-end.
	* POST: Criar uma informação no back-end.
	* PUT: Alterar uma informação no back-end.
	* DELETE: Deletar uma informação no back-end
  */

/**
	 * Tipos de parâmentro:
	 * 
	 * Query Params: Parâmetros nomeados enviados na rota apos "?" (filtro, paginação) ex.; /users?page=2&name=Leo&idade=22
	 * Route Params: Parâmetros utilizados para identificar recursos ex.: /users/1
	 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
	 */

/**
	* Databases
	* SQL: MySQL, SQLite, PostGreSQL, Oracle
	* NoSQL: MongoDB, CouchDB, etc.
  */
/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where('')
*/

// Ong routes
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.delete('/ongs/:id');

// incidents routes
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//profile routes
routes.get('/profile', ProfileController.index);
//session
routes.post('/session', SessionControler.create);
module.exports = routes;
