const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');

router.post('/', (req, res) => {

    if(req.body && req.body.username && req.body.password)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                mw.getDocumentQuery('users', 
                    {
                        'username': req.body.username, 
                        'password': req.body.password
                    }
                ).then((userData) =>
                {
                    if( ! userData.length )
                    {
                        res.status(403).send("Not allowed");
                        return false;
                    }
                    
                    req.session.user = userData[0];
                    res.status(200).send(userData);        
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