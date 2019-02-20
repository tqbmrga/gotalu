const MongoClient = require( 'mongodb' ).MongoClient;
require('dotenv').load()
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( 'mongodb://'+process.env.DB_MONGO_HOST+'/mongochat', function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};