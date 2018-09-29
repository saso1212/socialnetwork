const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');

router.get('/', (req, res) => {

    if(req.session.user)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {

                let query = {user1: req.session.user._id};

                mw.getDocumentQuery('friends', query).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(403).send('Not allowed');
            })
    }
    else 
    {
        res.status(403).send('Not allowed');
    }
})

router.get('/:userId', (req, res) => {

    if(req.session.user && req.params.userId)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {

                let query = {user1: req.params.userId};

                mw.getDocumentQuery('friends', query).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(403).send('Not allowed');
            })
    }
    else 
    {
        res.status(403).send('Not allowed');
    }
})


router.post('/:userId', (req, res) => {

    if(req.session.user && req.params.userId)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {

                let query = [
                    {
                        "user1": req.session.user._id,
                        "user2": req.params.userId
                    },
                    {
                        "user2": req.session.user._id,
                        "user1": req.params.userId
                    }
                ];

                mw.insertManyDocuments('friends', query).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            }, 
            (error) => {
                res.status(403).send('Not allowed');
            })
    }
    else
    {
        res.status(400).send('Bad request');
    }
});

router.delete('/:userId', (req, res) => {

    if(req.session.user && req.params.userId)
    {
        let mw = new mongoWrapper();

        mw._initDBConnection().then(
            () => {
                let query = { user1: req.session.user._id, user2: req.params.userId };

                mw.deleteDocument('friends', query).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            }, 
            (error) => {
                res.status(403).send('Not allowed');
            })
    }
    else
    {
        res.status(400).send('Bad request');
    }
});

module.exports = router;