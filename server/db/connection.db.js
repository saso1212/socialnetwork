const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'socialnetwork';

class Mongo
{
    constructor(){
        this.client = false;
    }

    connect()
    {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
                
                if(err)
                {
                    reject(err);
                    console.log('MONGO: ', err);
                    return false;
                }
                //Keep the instance reference on a class level
                this.client = client;

                console.log('MONGO: connected to ', dbName);
                resolve(client.db(dbName));
            });
        });        
    }

    disconnect()
    {
        console.log('MONGO: disconnected from ', dbName);
        this.client.close();
        this.client = false;
    }
}

module.exports = Mongo;