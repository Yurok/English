var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
//
// module.exports = router;

/* GET users listing. */
module.exports = function Dictionary (dictionary_model)
{
    router.get('/', function(req, res, next) {
        dictionary_model.all()
            .then((rows) => {
                res.json(rows)
            });
    });

    router.post('/', function(req, res, next) {
        var english = req.body.english;
        var russian = req.body.russian;


        if(!english || !russian)
            res.status(500).json({ success: false, message: "Nothing to post." });

        var dictionarydata = {
            userId: "",
            english: english,
            russian: russian
        }

        dictionary_model.create(dictionarydata)
            .then(row => {
                if (row) {
                    res.status(200).json({ success: true});
                } else {
                    throw new HttpError (500, "Word wasn't added.")
                }
            })
            .catch(function(err) {
                //throw err;
                next(err);
            });;
        res.send({});
    });

    router.post('/checkByenglish', function(req, res, next) {
        var english = req.body.english;
        var russian = req.body.russian;


        if(!english || !russian)
            res.status(500).json({ success: false, message: "Nothing to post." });

        var dictionarydata = {
            userId: "",
            english: english,
            russian: russian
        }

        dictionary_model.create(dictionarydata)
            .then(row => {
                if (row) {
                    res.status(200).json({ success: true});
                } else {
                    throw new HttpError (500, "Word wasn't added.")
                }
            })
            .catch(function(err) {
                //throw err;
                next(err);
            });;
        res.send({});
    });


    return router;
}