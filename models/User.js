var crypto = require('crypto');
var knexed = require('../libs/knexed')
var AuthError = require('../err/authError').AuthError;

module.exports = function User (db, app)
{
	var user = {}

	var knex = db.knex

	user.users_table = knexed(knex, 'user')

	user.byId = function (id, trx)
	{
		return user.users_table(trx)
			.select()
			.where('user.id', id)
			.then((users) => { return users[0]})
	}

	user.byEmail = function (email, trx)
	{
		return user.users_table(trx)
				.select()
				.where('user.email', email)
				.then((users) => { return users[0]})
	}

	user.create = function (trx, data)
	{
		return isEmailExists (data.email, trx)
		.then(() =>
		{
			return user.users_table(trx)
			.insert({
				firstName: data.username,
				lastName: data.username,
				email: data.username,
				hashedPassword: user.encryptPassword(data.password)
			}
			, 'id')
			.then(id => {return id})
		})
	}

	function isEmailExists (email, trx)
	{
		return user.byEmail(email, trx)
			.then( user => { if(user) throw Error ("user already exists") } )
	}

	user.remove = function (trx, ids)
	{
		var ids = ids.split(',')
		ids[0] || (ids = [])

		return user.users_table(trx)
			.whereIn('id', ids)
			.del()

	}

	user.list = function (ids)
	{
		return user.users_table()
			.select('id', 'firstName', 'lastName', 'pic')
			.whereIn('id', ids)
	}

	user.all = function ()
	{
		return user.users_table()
			.select('id', 'firstName', 'lastName', 'pic');
	}

	user.encryptPassword = function(password) {
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	};


	user.checkPassword = function (password, user) {
		return this.encryptPassword((password)) === user.hashedPassword;
	};

	// user.autorize = function (email, password) {
    //
	// 	user.byEmail(email)
	// 		.then((userdata) => {
	// 			if(userdata) {
	// 				if(user.checkPassword(password, userdata)) {
	// 					return userdata;
	// 				} else {
	// 					throw new AuthError ('Password is incorrect')
	// 				}
	// 			} else {
	// 				return user.create(null, userdata)
	// 			}
	// 		})
	// }

	return user
}
