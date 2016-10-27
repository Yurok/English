var config = require('../config');
var connection = config.get('pg');

module.exports =
{
	dev:
	{
		client: 'pg',
		connection: connection,

		migrations:
		{
			tableName: 'knex_migrations'
		}
	}
}
