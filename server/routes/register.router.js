const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');
const User = require('../classes/user.controller.js');

router.post('/', (req, res) => {

    if(req.body && req.body.username && req.body.password)
    {
        let user = new User();
        user.setUser(req.body);

        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                mw.insertDocument('users', user.getUser()).then(
                (result) =>
                {
                    res.status(200).send(result);        
                },
                (error) => {
                    console.log(error);
                    res.status(403).send(error);
                })
            },(error) => {
                console.log(error);
                res.status(403).send(error);
            }
        )
    }
    else
    {
        res.status(412).send('Missing parameters');
    }
});

module.exports = router;