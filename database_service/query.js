var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

const DatabaseService = {
    query: (database, err, options) => {
        if(err) throw err;
        console.log('\nOptions:\n');
        for(var key in options){
            console.log('\n',key, options[key],'\n');
        }
        let { dbName, collectionName, query } = options;
        db = database.db(dbName);
        let collection = db.collection(collectionName);
        return new Promise(function(resolve, reject) {
            db.collection(collectionName).aggregate(query).toArray(function(err, resp) {
                if (err) {
                    reject(err);
                } else {
                    //console.log('QUERY: ', resp);
                    resolve(resp);
                }
            });
        })
    }
} 
module.exports=DatabaseService;