const session = require('express-session');
const uuidv4 = require('uuid/v4');

userSession = function(){
    return session({
        genid: (req) => { return uuidv4()},
        secret: 'Asdfg123-',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 600000 }
    });
}

module.exports = userSession;