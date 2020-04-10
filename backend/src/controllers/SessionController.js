const connection = require('../databases/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	async create(req, res) {
		const { id, password } = req.body;
		const ong = await connection('ongs').where('id', id).select('id', 'name', 'password').first();

		if (!ong) {
			return res.status(400).json({ error: 'credentials error!' });
		} else {
			bcrypt.compare(password, ong.password, (err, data) => {
				if (!err) {
					const token = jwt.sign(
						{
							name: ong.name,
							id: ong.id
						},
						process.env.SECRET,
						{ expiresIn: '7d' },
						(err, token) => {
							if (!err) {
								return res.json({
									name: ong.name,
									token
								});
							}
						}
					);
				}
			});
		}
	}
};
