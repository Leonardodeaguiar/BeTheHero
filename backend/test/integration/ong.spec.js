const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/databases/connection');
describe('ONG', () => {
	beforeEach(async () => {
		// use rollback antes do latest para limpar o DB
		//await connection.migrate.rollback();
		await connection.migrate.latest();
	});
	afterAll(async () => {
		await connection.destroy();
	});
	it('should be able to create a new ong', async () => {
		const response = await request(app)
			.post('/ongs')
			// .Set('Authorization', 'dsaojdsoad') usa-se caso precise do header!
			.send({
				name: 'Awised',
				email: 'contato@Awised.com.br',
				password: '1234',
				whatsapp: '11123456788',
				city: 'Rio do sul',
				uf: 'SC'
			});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
	it('Should return an ONG list', async () => {
		const response = await request(app).get('/ongs');
		expect(response.body);
	});
	it('Should login', async () => {
		const response = await request(app).post('/session').send({
			id: '00b992f3',
			password: '1234'
		});
		console.log(response.body);
		expect(response.body).toHaveProperty('token');
		expect(response.body).toHaveProperty('name');
	});
});
