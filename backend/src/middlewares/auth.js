const jwt = require('jsonwebtoken');

module.exports = {
	auth: async (req, res, next) => {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(401).json({ error: 'no token provided' });
		}
		try {
			const decoded = await jwt.verify(token, process.env.SECRET);
			req.ong = decoded.id;
			next();
		} catch (error) {
			return res.status(401).json({ error: 'Falha de autenticação' });
		}
	}
};
