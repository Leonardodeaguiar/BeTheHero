// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './src/databases/db.sqlite'
		},
		migrations: {
			directory: 'src/databases/migrations'
		},
		useNullAsDefault: true
	},
	test: {
		client: 'sqlite3',
		connection: {
			filename: './src/databases/test.sqlite'
		},
		migrations: {
			directory: 'src/databases/migrations'
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
