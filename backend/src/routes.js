const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileControler');
const SessionControler = require('./controllers/SessionController');
const auth = require('./middlewares/auth');
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
routes.post(
	'/ongs',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			password: Joi.string().required().min(5),
			whatsapp: Joi.string().regex(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/).length(11),
			city: Joi.string().required(),
			uf: Joi.string().required().length(2)
		})
	}),
	OngController.create
);

// incidents routes
routes.get(
	'/incidents',
	celebrate({
		[Segments.QUERY]: Joi.object({
			page: Joi.number()
		})
	}),
	IncidentController.index
);
routes.post(
	'/incidents',
	auth,
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			value: Joi.number().required()
		})
	}),
	IncidentController.create
);
routes.delete(
	'/incidents/:id',
	auth,
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}),
	IncidentController.delete
);

//profile routes
routes.get('/profile', auth, ProfileController.index);
//session
routes.post(
	'/session',
	celebrate({
		[Segments.BODY]: Joi.object({
			id: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	SessionControler.create
);
module.exports = routes;
