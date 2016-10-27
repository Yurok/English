var knex = require('knex')
var config = require('../config');
var User = require('../models/User')

module.exports = function (app)
{
    var db = {}

    var connection = config.get('pg');

    db.knex = knex({
        client: 'pg',
        connection: connection
    })

    db.user = User(db, app)

    return db
}