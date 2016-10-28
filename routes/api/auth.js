var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
//
// module.exports = router;

/* GET users listing. */
module.exports = function Users (user_model)
{
    router.get('/', function(req, res, next) {
        var users = user_model.all()
            .then((users) => {
                res.json(users)
            });
    });

    router.post('/signin', function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        if(!username || !password)
            res.status(401).json({ success: false, message: "Authentication failed. Username or password can't be empty." });

        user_model.byEmail(username)
            .then(user => {
                if (user) {
                    if (user_model.checkPassword(password, user)) {
                        // Create token if the password matched and no error was thrown
                        const token = jwt.sign(user, secret, {
                            expiresIn: 10080 // in seconds
                        });
                        res.status(200).json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
                }
            })
            .catch(function(err) {
                //throw err;
                next(err);
            });;
    });

    router.post('/signup', function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        if(!username || !password)
            res.status(401).json({ success: false, message: "Authentication failed. Username or password can't be empty." });

        user_model.byEmail(username)
            .then(user => {
                if (user) {
                    throw new HttpError (401, "SigUp failed. Email already exists.")
                } else {
                    var userdata = {email: username, password: password}
                    return user_model.create(null, userdata);
                }
            })
            .then(user => {
                const token = jwt.sign(user, secret, {
                    expiresIn: 10080 // in seconds
                });
                res.status(200).json({ success: true, token: 'JWT ' + token });
            })
            .catch(function(err) {
                //throw err;
                next(err);
            });;
    });

    router.get('/signout', function(req, res, next) {
        //to do
        next();
    });

    return router;
}