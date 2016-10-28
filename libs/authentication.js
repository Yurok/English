const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/User');
var config = require('../config');

function initPassport (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.get('secret')
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        user.byId(jwt_payload.id)
            .then(user => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
    }));
}

module.exports = initPassport;