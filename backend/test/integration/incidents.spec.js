const request = require('supertest');
const connection = require('../../src/databases/connection');
const app = require('../../src/app');

describe('Incidents', () => {
	beforeEach(async () => {
		// use rollback antes do latest para limpar o DB
		//await connection.migrate.rollback();
		await connection.migrate.latest();
	});
	afterAll(async () => {
		await connection.destroy();
	});
	it('Should create an object', async () => {
		const response = await request(app).post('/incidents').set('Authorization', '9abacd50').send({
			title: 'Entrar no hype!',
			description: 'Skrr! skit skit!',
			value: 25.5
		});
		expect(response.body).toHaveProperty('id');
	});

	it('Should return an object list', async () => {
		const response = await request(app).get('/incidents?page=1').set('Authorization', '9abacd50');

		expect(response.body);
	});

	// it('Should delete an item from DB', async () => {
	//   const response = await request(app)
	//     .delete('/incidents/1')
	//     .set('Authorization', '9b0157d0')

	//   expect(response.status(204))
	// })
});
