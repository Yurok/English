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

    router.post('/', function(req, res, next) {
        res.send({});
    });

    return router;
}