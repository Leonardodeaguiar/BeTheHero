const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = await jwt.verify(token, process.env.SECRET);
		req.ong = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Falha de autenticação' });
	}
};
