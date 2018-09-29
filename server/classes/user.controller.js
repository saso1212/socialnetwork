let UserInterface = require('../interfaces/user.interface.js');

class User 
{
    constructor(){
        this.user = UserInterface;
    }

    setUser(data)
    {
        this.user = Object.assign(this.user, data);
    }

    getUser()
    {
        return this.user;
    }
}

module.exports = User;
