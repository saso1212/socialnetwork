const connection = require('./connection.db.js');
const ObjectId = require('mongodb').ObjectID;

class MongoWrapper
{
    constructor()
    {
        this.mongo;
//        this._initDBConnection();
        this.con;
        this.objectId = ObjectId;
    }

    _initDBConnection()
    {
        this.mongo = new connection();

        return new Promise((resolve, reject) => {
            this.mongo.connect().then(
            (con) => {
                //DB connection
                this.con = con;
                resolve();
            },
            (error) =>{
                this.con = false;
                reject(error);
            });
        });
    }

    getCollection(collectionName)
    {

    }

    getDocument(collectionName, fields)
    {
        return new Promise((resolve, reject) => {
            const collection = this.con.collection(collectionName)
            
            if( ! fields )
            {
                fields = {};
            }

            collection.find({}, {projection: fields}).toArray((err, docs) => {

                if(err)
                {
                    reject(err);
                    return false;
                }
                console.log('MONGO FIND: ', docs);
                resolve(docs);
                this.mongo.disconnect();
            });
        });
    }

    getDocumentQuery(collectionName, query)
    {
        return new Promise((resolve, reject) => {
            const collection = this.con.collection(collectionName)
            
            collection.find(query).toArray((err, docs) => {

                if(err)
                {
                    reject(err);
                    return false;
                }
                console.log('MONGO FIND: ', docs);
                resolve(docs);
                this.mongo.disconnect();
            });
        });
    }



    /*
        @param data {a:1};
    */
    insertDocument(collectionName, data)
    {
                
        return new Promise((resolve, reject) => {

            const collection = this.con.collection(collectionName);

            collection.countDocuments().then( (items) => {
                
                data._id = this.objectId(items+1);


                collection.insertOne(data, (err, docs) => {

                    if(err)
                    {
                        reject(err);
                        return false;
                    }

                    console.log('MONGO INSERT: ', docs);
                    resolve(docs);
                    this.mongo.disconnect();
                });
            });
            
        });
    }

    insertManyDocuments(collectionName, data)
    {
                
        return new Promise((resolve, reject) => {

            const collection = this.con.collection(collectionName);

            collection.insertMany(data, (err, docs) => {

                if(err)
                {
                    reject(err);
                    return false;
                }

                console.log('MONGO INSERT: ', docs);
                resolve(docs);
                this.mongo.disconnect();
            });
            
        });
    }

    deleteDocument(collectionName, query)
    {
        return new Promise( (resolve, reject) => {

            const collection = this.con.collection(collectionName);
            
            collection.deleteOne( query, (error, result) => {

                if(error)
                {
                    reject(error);
                    return false;
                }

                console.log('MONGO DELETE: ', query._id);
                resolve(result);
                this.mongo.disconnect();

            });
        });
    }

    updateDocument(collectionName, query, newValues)
    {
        return new Promise((resolve, reject) => {
            const collection = this.con.collection(collectionName);
            //UPDATE INTO tablename SET field = value WHERE field = othervalue    
            collection.updateOne(query, newValues, (error, result) => {
                
                if(error)
                {
                    reject(error);
                    return false;
                }
    
                console.log('MONGO UPDATE: ', query._id);
                resolve(result);
                this.mongo.disconnect();
            });
        })
    } 
}

module.exports = MongoWrapper;