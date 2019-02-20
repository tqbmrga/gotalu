const MongoClient = require('mongodb').MongoClient

module.exports = {
    connect: async function(callback) {
        var connection;
        await new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://'+process.env.DB_MONGO_HOST+'/mongochat', {
                useNewUrlParser: true
            }, (err, database) => {
                if (err)
                    reject();
                else {
                    connection = database;
                    resolve();
                }
            });
        });
        return connection;
    }
};

// using
// var mongoUtil = require( 'mongoUtil' );
// var db = mongoUtil.getDb();

// db.collection( 'users' ).find();