const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');

router.get('/', (req, res) => {

    if( req.session.user )
    {
        //
    }
    else
    {
        res.status(403).send('Not allowed');
    }
});

router.post('/', (req, res) => {

    if(req.session.user && req.body && req.body.text)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                mw.insertDocument('posts', {
                    user: req.session.user._id,
                    text: req.body.text
                }).then(
                    () => {
                        res.status(200).send();
                    },
                    (error) => {
                        res.status(400).send(error);
                    })
            },
            (error) => {
                res.status(403).send(error);
            }
        )
    }
    else if( ! req.session.user)
    {
        res.status(403).send("Not allowed");
    }
    else
    {
        res.status(412).send("Missing parameters");
    }
});

router.delete('/:postId', (req, res) => {

    if(req.session.user && req.params.postId)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                
                let query = {
                    _id: mw.objectId(req.params.postId), 
                    user: req.session.user._id
                };

                mw.deleteDocument('posts', query).then(
                    (deleted) => {
                        res.status(200).send(deleted);
                    },
                    (fail) => {
                        res.status(403).send(fail);
                    }
                );
            },
            (error) => {
                res.status(412).send(error);
            })
    }
    else if( ! req.session.user)
    {
        res.status(403).send("Not allowed");
    }
    else
    {
        res.status(412).send("Missing parameters");
    }
});

module.exports = router;