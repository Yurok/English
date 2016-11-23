var knex = require('knex')
var config = require('../config');
var User = require('../models/User')
var Dictionary = require('../models/Dictionary')

module.exports = function (app)
{
    var db = {}

    var connection = config.get('pg');

    db.knex = knex({
        client: 'pg',
        connection: connection
    })

    db.user = User(db, app)
    db.dictionary = Dictionary(db, app)

    return db
}