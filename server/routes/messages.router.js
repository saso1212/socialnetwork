const express = require('express');
const router = express.Router();
const mongoWrapper = require('../db/wrapper.db.js');
const Message = require('../classes/messages.controller.js');

//Get all messages for me with people
router.get('/', (req, res) => {

    if(req.session.user)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {
                mw.getDocumentQuery(
                    'messages', 
                    {   
                        $or: [
                            { senderId: req.session.user.id },
                            { recipientId: req.session.user.id}
                        ]
                    }).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }
});

router.get('/:userId/messages', (req, res) => {

    if(req.session.user && req.params.userId)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => { console.log(req.session.user.id, req.params.userId)
                mw.getDocumentQuery(
                    'messages', 
                    {   // *** WHERE (senderId = ID1 AND recipientID = ID2) OR (senderId = ID2 AND recipientId = ID1)
                        $or: [{
                            senderId: req.session.user.id,
                            recipientId: req.params.userId
                        },
                        {
                            senderId: req.params.userId,
                            recipientId: req.session.user.id     
                        }]
                    }).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }
});

router.get('/:messageId', (req, res) => {

    if(req.session.user && req.params.messageId)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {
                mw.getDocumentQuery(
                    'messages', 
                    {   
                        $or: [
                            {
                                senderId: req.session.user.id, 
                                _id: mw.objectId(req.params.messageId)
                            },
                            {
                                recipientId: req.session.user.id, 
                                _id: mw.objectId(req.params.messageId)
                            }
                        ]
                        
                    }).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }
});

router.put('/:messageId', (req, res) => {

    if(req.session.user && req.params.messageId)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {

                let message = new Message();
                               
                req.body.senderId = req.session.user.id;
                message.setMessage(req.body); 

                mw.updateDocument(
                        'messages', 
                        {
                            senderId: req.session.user.id, 
                            _id: mw.objectId(req.params.messageId)
                        },
                        { $set : message.getMessage() }
                    ).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }
});

router.post('/:userId', (req, res) => {

    if(req.session.user && req.body)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {

                let message = new Message();
                
                req.body.senderId = req.session.user.id;
                message.setMessage(req.body);
                
                //Validate                
                if(! req.body.recipientId)
                {
                    res.status(412).send('Missing params');
                    return false;
                }

                mw.insertDocument('messages', message.getMessage()).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }

});

router.delete('/:messageId', (req, res) => {

    if(req.session.user && req.params.messageId)
    {
        let mw = new mongoWrapper();
        mw._initDBConnection().then(
            () => {
                mw.deleteDocument(
                    'messages', 
                    {
                        senderId: req.session.user.id, 
                        _id: mw.objectId(req.params.messageId)
                    }).then(
                    (result) => {
                        res.status(200).send(result);
                    },
                    (error) => {
                        res.status(412).send(error);
                    });
            },
            (error) => {
                res.status(400).send(error);
            });
    }
    else
    {
        res.status(403).send();
    }
});

module.exports = router;