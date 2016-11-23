var crypto = require('crypto');
var knexed = require('../libs/knexed')

module.exports = function Dictionary (db)
{
	var dictionary = {}

	var knex = db.knex

	dictionary.dictionary_table = knexed(knex, 'dictionary')

	dictionary.byId = function (id, trx)
	{
		return dictionary.dictionary_table(trx)
			.select()
			.where('dictionary.id', id)
			.then((rows) => { return rows[0]} )
	}

	dictionary.byWord = function (english, russian, trx)
	{
		return dictionary.dictionary_table(trx)
				.select()
				.where({
					'dictionary.english': english,
					'dictionary.russian': russian
				})
				.then((rows) => { return rows[0]})
	}

	dictionary.checkByEnglish = function (id, english, trx)
	{
		return dictionary.dictionary_table(trx)
			.select('id')
			.where({
				'dictionary.id': id,
				'dictionary.english': english
			})
			.then((rows) => {
				if (rows[0]){
					return true;
				} else {
					return false;
				}
			})
	}

	dictionary.checkByRussian = function (id, russian, trx)
	{
		return dictionary.dictionary_table(trx)
			.select('id')
			.where({
				'dictionary.id': id,
				'dictionary.russian': russian
			})
			.then((rows) => {
				if (rows[0]){
					return true;
				} else {
					return false;
				}
			})
	}

	dictionary.create = function (trx, data)
	{
		return isWordExists (data.english, data.russian, trx)
		.then(() =>
		{
			var salt = gen_rand_str(16);
			return dictionary.dictionary_table(trx)
				.insert(
					{
						userId: data.userId,
						english: data.english,
						russian: data.russian
					}, '*')
			.then(rows => {return rows[0]})
		})
	}

	function isWordExists (english, russian, trx)
	{
		return dictionary.byWord(english, russian, trx)
			.then( user => { if(user) throw Error ("user already exists") } )
	}

	dictionary.remove = function (trx, ids)
	{
		var ids = ids.split(',')
		ids[0] || (ids = [])

		return dictionary.dictionary_table(trx)
			.whereIn('id', ids)
			.del()

	}

	dictionary.list = function (ids)
	{
		return dictionary.dictionary_table()
			.select()
			.whereIn('id', ids)
	}

	dictionary.all = function ()
	{
		return dictionary.dictionary_table()
			.select();
	}

	return dictionary
}
