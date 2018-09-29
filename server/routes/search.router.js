const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');

router.get('/:type/:keyword', (req, res) => {

    if(req.params && req.params.type && req.params.keyword)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                let collectionName = (req.params.type === 'user' ? 'users' : 'posts');
                //Replacement for SQL LIKE %..%
                let regex = new RegExp(req.params.keyword, "ig");
                let query = (req.params.type === 'user' ? {username: req.params.keyword} : {text: regex});

                mw.getDocumentQuery(collectionName, query).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(400).send(error);
                    }
                )
            },
            (error) => {
                res.status(403).send("Not allowed");
            }
        )
    }
    else
    {
        res.status(412).send("Missing params");
    }
});

module.exports = router;