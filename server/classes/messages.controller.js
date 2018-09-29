let MessageInterface = require('../interfaces/message.interface.js');

class Message
{
    constructor()
    {
        this.message = MessageInterface;
    }

    setMessage(message)
    {
        this.message = Object.assign(this.message, message);
    }

    getMessage()
    {
        return this.message;
    }
}

module.exports = Message;