const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');

router.get('/', (req, res) => {

    if(req.session.user)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {
                mw.getDocument('users', {"password":0}).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    }
                )
            },
            (error) => {
                res.status(400).send(error);
            })
    }
    else
    {
        res.status(403).send('Not logged in');
    }
});

module.exports = router;