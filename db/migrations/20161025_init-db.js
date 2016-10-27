
exports.up = function (knex, Promise)
{
	return Promise.resolve()
	.then(() =>
	{
		return knex.schema.createTable('user', (table) =>
		{
			table.increments('id').primary()

			table.string('firstName').notNullable()
			table.string('lastName').notNullable()
			table.string('email')
			table.string('hashedPassword', 72).notNullable()
			table.text('pic').nullable()
		})
	})
	.then(() =>
	{
		return knex.schema.createTable('dictionary', (table) =>
		{
			table.increments('id').primary()

			table.integer('userId')
			.references('user.id')

			table.string('english').notNullable()
			table.string('russian').notNullable()
		})
	})
	.then(() =>
	{
		return knex.seed.run({ directory: './seeds/20161025' })
	})
}

exports.down = function (knex, Promise)
{
	return Promise.all(
	[
		knex.schema.dropTableIfExists('user'),
		knex.schema.dropTableIfExists('dictionary')
	])
}
