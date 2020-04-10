const connection = require('../databases/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const bcrypt = require('bcryptjs');

module.exports = {
	async create(req, res) {
		const { name, email, password, whatsapp, city, uf } = req.body;
		const id = generateUniqueId();
		bcrypt.hash(password, 8, async (err, result) => {
			if (err) {
				res.json({ error: 'Server Error' });
			}
			await connection('ongs').insert({
				id,
				name,
				email,
				password,
				whatsapp,
				city,
				uf
			});
		});
		return res.json({
			id
		});
	},

	async index(req, res) {
		const ongs = await connection('ongs').select('*');
		return res.json(ongs);
	}
};
