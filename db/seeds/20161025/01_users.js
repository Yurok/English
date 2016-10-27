/* eslint-disable max-len */

exports.seed = function (knex, Promise)
{
	return knex('user').del()
	.then(() =>
	{
		return knex('dictionary').del()
	})
	.then(() =>
	{
		return Promise.join(
			knex('user')
			.insert(
			{
				email: 'seed.1@user.com',
				firstName: 'Seed',
				lastName: 'User1',
				hashedPassword: '4d4bf931bb840b74c0349879be5eeebc786e21b9fc7b05e272bb0fe402d54b8559def007',
				pic: 'ee11cbb19052e40b07aac0ca060c23ee'
			}, 'id')
			.then(id =>
			{
				return Promise.join(
						 knex('dictionary').insert(
						{
							userId: id[0],
							english: 'word1',
							russian: 'slovo1'
						}),
						knex('dictionary').insert(
						{
							userId: id[0],
							english: 'word2',
							russian: 'slovo2'
						}),
						knex('dictionary').insert(
						{
							userId: id[0],
							english: 'word3',
							russian: 'slovo3'
						})
				)
			}),

			knex('user').insert(
			{
				email: 'seed.2@user.com',
				firstName: 'Seed',
				lastName: 'User2',
				hashedPassword: '4d4bf931bb840b74c0349879be5eeebc786e21b9fc7b05e272bb0fe402d54b8559def007'
			}),

			knex('user').insert(
			{
				email: 'seed.3@user.com',
				firstName: 'Seed',
				lastName: 'User3',
				hashedPassword: '4d4bf931bb840b74c0349879be5eeebc786e21b9fc7b05e272bb0fe402d54b8559def007',
				pic: 'ee11cbb19052e40b07aac0ca060c23ee'
			})
		)
	})

}
