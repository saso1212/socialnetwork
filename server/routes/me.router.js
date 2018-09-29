const express = require('express');
const router = express.Router();
const User = require('../classes/user.controller.js');
const mongoWrapper = require('../db/wrapper.db.js');

router.get('/', (req, res) => {

    if(req.session.user)
    {
        res.status(200).send(req.session.user);
    }
    else
    {
        res.status(403).send("Not allowed");
    }
});

router.put('/', (req, res) => {
    
    if(req.body && req.session.user)
    {
        let user = new User();
        user.setUser(req.body);

        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                
                let query = {_id: mw.objectId(req.session.user._id)};
                let values = { $set: user.getUser() };

                mw.updateDocument('users', query, values).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send('Can\'t update');
                    }
                );
            },
            (error) => {
                res.status(400).send('Bad request');
            }
        );

    }
    else
    {
        res.status(403).send("Not allowed");
    }
});

module.exports = router;