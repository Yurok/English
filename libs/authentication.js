var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../config');

function initPassport (passport, user_model) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.get('secret')
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        user_model.byId(jwt_payload)
            .then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch(function(err) {
                return done(err, false);
            });
    }));
}

module.exports = initPassport;